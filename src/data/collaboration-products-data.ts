import { CollaborationProduct } from "@/components/rnd/collaboration-product-cards";

/**
 * Products that need hardware partners, collaborators, or investors.
 * These products have completed software development by ECX Lab
 * and are seeking hardware support to bring them to market.
 */
export const collaborationProductsData: CollaborationProduct[] = [
  {
    id: "secure-enclave-device",
    name: "Secure Enclave Device",
    description: "A hardware security module with advanced cryptographic capabilities. Software stack is complete and production-ready, seeking hardware manufacturing partners.",
    softwareStatus: "Software Complete",
    hardwareNeeds: ["Custom Hardware", "Embedded Systems", "Secure Element"],
    imageUrl: undefined,
  },
  {
    id: "quantum-resistant-hsm",
    name: "Quantum-Resistant HSM",
    description: "Hardware Security Module designed for post-quantum cryptography. All software components including firmware and management interfaces are ready for integration.",
    softwareStatus: "Software Complete",
    hardwareNeeds: ["HSM Hardware", "FPGA/ASIC", "Tamper-Resistant Design"],
    imageUrl: undefined,
  },
];

