// src/app/api/verify-recaptcha/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import { Buffer } from 'buffer';

function getGoogleCredentials() {
  const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  const credentialsBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;

  try {
    if (credentialsJson) {
      return JSON.parse(credentialsJson);
    }

    if (credentialsBase64) {
      const decoded = Buffer.from(credentialsBase64, 'base64').toString('utf-8');
      return JSON.parse(decoded);
    }
  } catch (error) {
    console.error('Failed to parse Google credentials:', error);
    throw new Error('Invalid Google Cloud credentials format');
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { token, action } = await request.json();

    console.log('reCAPTCHA verification request:', { hasToken: !!token, action });

    if (!token || !action) {
      console.error('Missing token or action:', { token: !!token, action: !!action });
      return NextResponse.json(
        { success: false, error: 'Missing token or action' },
        { status: 400 }
      );
    }

    const projectID = process.env.GOOGLE_CLOUD_PROJECT_ID || 'ecx-website';
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LePWw4sAAAAAC1uN1p2WdvuYR8APIg13cyGFrya';

    // Initialize the reCAPTCHA Enterprise client
    // Support JSON/base64 credentials to work on serverless platforms like Vercel
    const credentials = getGoogleCredentials();
    const client = credentials
      ? new RecaptchaEnterpriseServiceClient({ credentials })
      : new RecaptchaEnterpriseServiceClient();
    
    const projectPath = client.projectPath(projectID);

    // Build the assessment request
    const requestBody = {
      parent: projectPath,
      assessment: {
        event: {
          token: token,
          siteKey: recaptchaSiteKey,
        },
      },
    };

    console.log('Creating assessment with:', { projectID, siteKey: recaptchaSiteKey, hasToken: !!token });

    // Create the assessment
    const [response] = await client.createAssessment(requestBody);

    console.log('Assessment response:', {
      valid: response.tokenProperties?.valid,
      action: response.tokenProperties?.action,
      invalidReason: response.tokenProperties?.invalidReason,
      score: response.riskAnalysis?.score,
    });

    // Check if the token is valid
    if (!response.tokenProperties?.valid) {
      const invalidReason = response.tokenProperties?.invalidReason || 'Unknown reason';
      console.error('Token is invalid:', invalidReason);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid reCAPTCHA token',
          invalidReason: invalidReason,
        },
        { status: 400 }
      );
    }

    // Check if the expected action was executed
    if (response.tokenProperties?.action !== action) {
      console.error('Action mismatch:', {
        expected: action,
        received: response.tokenProperties?.action,
      });
      return NextResponse.json(
        {
          success: false,
          error: 'Action mismatch',
          expectedAction: action,
          receivedAction: response.tokenProperties?.action,
        },
        { status: 400 }
      );
    }

    // Get the risk score
    const score = response.riskAnalysis?.score ?? 0;
    const reasons = response.riskAnalysis?.reasons || [];

    console.log('reCAPTCHA score:', score, 'Reasons:', reasons);

    // Score threshold: 0.3 (adjust based on your needs)
    // Lower score = more likely to be a bot
    if (score < 0.3) {
      console.warn('Low reCAPTCHA score:', score);
      return NextResponse.json(
        {
          success: false,
          error: 'Low reCAPTCHA score - possible bot activity',
          score: score,
          reasons: reasons,
        },
        { status: 400 }
      );
    }

    // Verification successful
    return NextResponse.json({
      success: true,
      score: score,
      reasons: reasons,
      action: response.tokenProperties?.action,
    });
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    
    // Handle authentication errors
    if (error instanceof Error) {
      if (
        error.message.includes('authentication') ||
        error.message.includes('credentials') ||
        error.message.includes('Could not load the default credentials')
      ) {
        console.error('Authentication error details:', error.message);
        return NextResponse.json(
          {
            success: false,
            error: 'Google Cloud authentication required',
            details: 'Please set up Google Cloud credentials. See ENV_SETUP.md for instructions.',
            setupRequired: true,
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

