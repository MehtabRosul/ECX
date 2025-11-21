/**
 * Cookie Encryption Utilities
 * Uses Web Crypto API for secure encryption/decryption of cookie data
 */

// Generate a key from the domain and a constant salt
async function getEncryptionKey(): Promise<CryptoKey> {
  // Use domain + a constant salt for key derivation
  // In production, you might want to use a server-provided key or user-specific key
  const keyMaterial = `${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}-ecx-cookie-encryption-v1`;
  
  // Convert to ArrayBuffer
  const encoder = new TextEncoder();
  const keyData = encoder.encode(keyMaterial);
  
  // Hash the key material to get a consistent 32-byte key
  const hashBuffer = await crypto.subtle.digest('SHA-256', keyData);
  
  // Import as AES-GCM key (AES-256 requires 32 bytes)
  return crypto.subtle.importKey(
    'raw',
    hashBuffer,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

// Generate a random IV (Initialization Vector) for each encryption
function generateIV(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(12)); // 12 bytes for GCM
}

/**
 * Encrypt cookie data before storing
 */
export async function encryptCookieData(data: string): Promise<string> {
  try {
    if (typeof window === 'undefined' || !crypto?.subtle) {
      // Fallback to base64 encoding if Web Crypto is not available
      return btoa(encodeURIComponent(data));
    }

    const key = await getEncryptionKey();
    const iv = generateIV();
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    // Encrypt using AES-GCM
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
        tagLength: 128, // 128-bit authentication tag
      },
      key,
      dataBuffer
    );

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encryptedData.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedData), iv.length);

    // Convert to base64 for storage
    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.error('Encryption error:', error);
    // Fallback to base64 encoding
    return btoa(encodeURIComponent(data));
  }
}

/**
 * Decrypt cookie data after reading
 */
export async function decryptCookieData(encryptedData: string): Promise<string | null> {
  try {
    if (typeof window === 'undefined' || !crypto?.subtle) {
      // Fallback to base64 decoding if Web Crypto is not available
      try {
        return decodeURIComponent(atob(encryptedData));
      } catch {
        return null;
      }
    }

    // Decode from base64
    const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    
    // Extract IV (first 12 bytes) and encrypted data (rest)
    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);

    const key = await getEncryptionKey();

    // Decrypt using AES-GCM
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
        tagLength: 128,
      },
      key,
      encrypted
    );

    // Convert back to string
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch (error) {
    console.error('Decryption error:', error);
    // Try fallback base64 decoding
    try {
      return decodeURIComponent(atob(encryptedData));
    } catch {
      return null;
    }
  }
}

/**
 * Check if encryption is available
 */
export function isEncryptionAvailable(): boolean {
  return typeof window !== 'undefined' && 
         typeof crypto !== 'undefined' && 
         typeof crypto.subtle !== 'undefined';
}

