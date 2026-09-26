import type { LegalAnswer } from "@/lib/store/features/consultations/consultations.types";

// Prototype data. Statutes are real Pakistani enactments with paraphrased passages;
// case citations use placeholder numbers and are NOT verified authorities.
export type AnswerTemplateId = "divorce" | "guardianship" | "criminal" | "property";

const divorce: LegalAnswer = {
  issue: "Whether a wife may obtain dissolution of marriage on the ground of cruelty, and which provisions and forum govern the proceedings.",
  applicableLaw: [
    { sourceId: "dmma-2", summary: "Lists the grounds on which a woman married under Muslim law may seek dissolution, including cruelty by the husband." },
    { sourceId: "fca-5", summary: "Gives Family Courts jurisdiction over dissolution of marriage and related maintenance claims." },
    { sourceId: "mflo-9", summary: "Addresses a husband's failure to maintain his wife, a related issue that often accompanies these proceedings." },
  ],
  caseLaw: [
    { sourceId: "case-pld-2023-sc-421", summary: "Illustrates how courts weigh the evidence when cruelty is alleged." },
    { sourceId: "case-pld-2022-lah-xxx", summary: "Addresses the scope of a Family Court's findings on the pleaded ground." },
  ],
  analysis: [
    { text: "The wife's suit would ordinarily be instituted before the Family Court", sourceId: "fca-5" },
    { text: ", relying on cruelty as a ground for dissolution under the 1939 Act", sourceId: "dmma-2" },
    { text: ". Courts have treated cruelty as a question of fact that must be proved by evidence", sourceId: "case-pld-2023-sc-421" },
    { text: ", assessed on the whole of the circumstances", sourceId: "case-pld-2022-lah-xxx" },
    { text: ". Maintenance may be claimed alongside, or separately", sourceId: "mflo-9" },
    { text: "." },
  ],
  conclusion: [
    { text: "Cruelty under section 2 of the Dissolution of Muslim Marriages Act, 1939 is likely to be the central provision, heard by the Family Court", sourceId: "dmma-2" },
    { text: ". The outcome will depend on the evidence led. Please consult qualified counsel." },
  ],
  sources: [
    { id: "dmma-2", kind: "statute", title: "Dissolution of Muslim Marriages Act, 1939", provision: "Section 2(viii)", passage: "Section 2 sets out the grounds on which a woman married under Muslim law may obtain a decree dissolving her marriage. Clause (viii) covers cruelty by the husband, including habitual assault or making her life miserable by cruelty of conduct. (Paraphrased for illustration.)", relevance: "Supplies the statutory ground the wife would rely on." },
    { id: "fca-5", kind: "statute", title: "West Pakistan Family Courts Act, 1964", provision: "Section 5 and Schedule", passage: "Family Courts have exclusive jurisdiction over the matters listed in the Schedule, which include dissolution of marriage and maintenance. (Paraphrased for illustration.)", relevance: "Identifies the forum and the related claims that can be joined." },
    { id: "mflo-9", kind: "statute", title: "Muslim Family Laws Ordinance, 1961", provision: "Section 9", passage: "Where a husband fails to maintain his wife adequately, the wife may apply for a remedy under this section. (Paraphrased for illustration.)", relevance: "Covers the maintenance dimension that frequently accompanies dissolution." },
    { id: "case-pld-2023-sc-421", kind: "case", title: "PLD 2023 SC 421", court: "Supreme Court of Pakistan", passage: "Illustrative passage: the Court examined the evidence of the alleged conduct and asked whether it amounted to cruelty within the meaning of the Act.", principle: "Cruelty is a question of fact, proved on evidence and assessed in context.", relevance: "Shows the evidentiary approach courts take to the ground." },
    { id: "case-pld-2022-lah-xxx", kind: "case", title: "PLD 2022 Lahore XXX", court: "Lahore High Court", passage: "Illustrative passage: the High Court reviewed the Family Court's appreciation of the evidence on the pleaded ground.", principle: "Findings on the ground must rest on the whole record.", relevance: "Indicates how findings on the pleaded ground are reviewed." },
  ],
};

const guardianship: LegalAnswer = {
  issue: "Whether a mother may seek custody of her minor child after divorce, and the standard the court applies.",
  applicableLaw: [
    { sourceId: "gwa-17", summary: "Directs the court to be guided by the welfare of the minor when deciding guardianship and custody." },
    { sourceId: "gwa-25", summary: "Provides the remedy for obtaining custody of a minor from a person who has it." },
    { sourceId: "fca-guard", summary: "Places guardianship and custody matters within the Family Court's jurisdiction." },
  ],
  caseLaw: [
    { sourceId: "case-2022-scmr-1156", summary: "Treats the welfare of the minor as the paramount consideration." },
    { sourceId: "case-pld-2021-lah-xxx", summary: "Considers the child's age and the mother's role in the early years." },
  ],
  analysis: [
    { text: "A mother may apply to the Family Court for custody", sourceId: "fca-guard" },
    { text: ", and the court decides by reference to the welfare of the minor", sourceId: "gwa-17" },
    { text: ". Courts have called welfare the paramount consideration", sourceId: "case-2022-scmr-1156" },
    { text: ", and have considered the child's age and needs", sourceId: "case-pld-2021-lah-xxx" },
    { text: ". Section 25 is the provision for obtaining custody where the child is with another person", sourceId: "gwa-25" },
    { text: "." },
  ],
  conclusion: [
    { text: "A mother can seek custody after divorce, and the decisive test is the minor's welfare rather than either parent's entitlement", sourceId: "gwa-17" },
    { text: ". Outcomes turn on the facts. Please consult qualified counsel." },
  ],
  sources: [
    { id: "gwa-17", kind: "statute", title: "Guardians and Wards Act, 1890", provision: "Section 17", passage: "In appointing or declaring a guardian, the court must be guided by what appears to be consistent with the welfare of the minor, having regard to age, sex and religion. (Paraphrased for illustration.)", relevance: "Sets the welfare standard the court applies." },
    { id: "gwa-25", kind: "statute", title: "Guardians and Wards Act, 1890", provision: "Section 25", passage: "Where a ward leaves or is removed from the custody of a guardian, the court may order the ward's return where it is for the welfare of the ward. (Paraphrased for illustration.)", relevance: "Provides the custody remedy referred to in the question." },
    { id: "fca-guard", kind: "statute", title: "West Pakistan Family Courts Act, 1964", provision: "Section 5 and Schedule", passage: "The Schedule lists guardianship and custody of minors among the matters within the Family Court's jurisdiction. (Paraphrased for illustration.)", relevance: "Identifies where the application is filed." },
    { id: "case-2022-scmr-1156", kind: "case", title: "2022 SCMR 1156", court: "Supreme Court of Pakistan", passage: "Illustrative passage: the Court held that the welfare of the minor is the paramount consideration in custody disputes.", principle: "Welfare of the minor outweighs the competing claims of the parents.", relevance: "Confirms the governing test." },
    { id: "case-pld-2021-lah-xxx", kind: "case", title: "PLD 2021 Lahore XXX", court: "Lahore High Court", passage: "Illustrative passage: the High Court considered the age of the child and the care given by the mother in the early years.", principle: "The child's age and need for care are weighed within the welfare inquiry.", relevance: "Shows how welfare is applied to a young child." },
  ],
};

const criminal: LegalAnswer = {
  issue: "Which provisions of the Pakistan Penal Code and the procedural law may apply where a death is caused during a quarrel.",
  applicableLaw: [
    { sourceId: "ppc-300", summary: "Defines qatl-i-amd, the offence of intentionally causing death." },
    { sourceId: "ppc-302", summary: "Provides the punishment for qatl-i-amd." },
    { sourceId: "crpc-154", summary: "Governs the first information report that sets a criminal case in motion." },
  ],
  caseLaw: [
    { sourceId: "case-pld-2020-sc-xxx", summary: "Discusses how intention is inferred from the surrounding circumstances." },
    { sourceId: "case-2019-scmr-xxx", summary: "Addresses the level of proof needed to sustain a conviction." },
  ],
  analysis: [
    { text: "The case begins with an FIR", sourceId: "crpc-154" },
    { text: ". Whether the offence is qatl-i-amd depends on whether death was caused with the intention or knowledge described in section 300", sourceId: "ppc-300" },
    { text: ", and if so, section 302 supplies the punishment", sourceId: "ppc-302" },
    { text: ". Courts infer intention from the surrounding circumstances", sourceId: "case-pld-2020-sc-xxx" },
    { text: ", and require proof sufficient to sustain a conviction", sourceId: "case-2019-scmr-xxx" },
    { text: "." },
  ],
  conclusion: [
    { text: "Sections 300 and 302 of the Pakistan Penal Code are the provisions most likely to be examined, with the classification turning on intention and the circumstances of the quarrel", sourceId: "ppc-300" },
    { text: ". This is research support only. Please consult qualified criminal counsel." },
  ],
  sources: [
    { id: "ppc-300", kind: "statute", title: "Pakistan Penal Code, 1860", provision: "Section 300", passage: "Whoever, with the intention of causing death or bodily injury likely to cause death, or with the knowledge that his act is so imminently dangerous, causes death, commits qatl-i-amd. (Paraphrased for illustration.)", relevance: "Defines the offence whose ingredients would be examined." },
    { id: "ppc-302", kind: "statute", title: "Pakistan Penal Code, 1860", provision: "Section 302", passage: "Section 302 provides the punishment for qatl-i-amd, depending on the mode of proof and the circumstances. (Paraphrased for illustration.)", relevance: "Supplies the punishment if the offence is made out." },
    { id: "crpc-154", kind: "statute", title: "Code of Criminal Procedure, 1898", provision: "Section 154", passage: "Information of a cognizable offence given to the officer in charge of a police station is reduced to writing and recorded as the first information report. (Paraphrased for illustration.)", relevance: "Marks the start of the criminal process." },
    { id: "case-pld-2020-sc-xxx", kind: "case", title: "PLD 2020 SC XXX", court: "Supreme Court of Pakistan", passage: "Illustrative passage: the Court inferred intention from the weapon used, the part of the body targeted and the circumstances of the incident.", principle: "Intention is inferred from the surrounding circumstances.", relevance: "Shows how intention is established in practice." },
    { id: "case-2019-scmr-xxx", kind: "case", title: "2019 SCMR XXX", court: "Supreme Court of Pakistan", passage: "Illustrative passage: the Court stressed that a conviction must rest on reliable, confidence-inspiring evidence.", principle: "Guilt must be established on evidence that inspires confidence.", relevance: "States the standard the prosecution must meet." },
  ],
};

const property: LegalAnswer = {
  issue: "Whether an agreement to sell immovable property can be enforced by a suit for specific performance, and within what time.",
  applicableLaw: [
    { sourceId: "sra-12", summary: "Identifies the contracts for which specific performance may be ordered." },
    { sourceId: "tpa-54", summary: "Explains that a contract for sale does not by itself create an interest in the property." },
    { sourceId: "lim-113", summary: "Sets the limitation period for a suit for specific performance." },
  ],
  caseLaw: [
    { sourceId: "case-pld-2021-sc-xxx", summary: "Requires the buyer to show continued readiness and willingness to perform." },
    { sourceId: "case-2020-scmr-xxx", summary: "Considers how the payment of an advance is proved." },
  ],
  analysis: [
    { text: "An agreement to sell does not by itself transfer ownership", sourceId: "tpa-54" },
    { text: ", but a court may direct the seller to perform where the contract is enforceable", sourceId: "sra-12" },
    { text: ". The suit must be filed within the limitation period", sourceId: "lim-113" },
    { text: ", and the buyer must show readiness and willingness to perform", sourceId: "case-pld-2021-sc-xxx" },
    { text: ", with the advance proved on the evidence", sourceId: "case-2020-scmr-xxx" },
    { text: "." },
  ],
  conclusion: [
    { text: "A suit for specific performance is the principal remedy, subject to limitation and to proof of the buyer's readiness", sourceId: "sra-12" },
    { text: ". Please consult qualified counsel before acting." },
  ],
  sources: [
    { id: "sra-12", kind: "statute", title: "Specific Relief Act, 1877", provision: "Section 12", passage: "Section 12 identifies the cases in which specific performance of a contract may be enforced. (Paraphrased for illustration.)", relevance: "Supplies the remedy against a seller who refuses to execute the deed." },
    { id: "tpa-54", kind: "statute", title: "Transfer of Property Act, 1882", provision: "Section 54", passage: "A contract for the sale of immovable property does not, of itself, create any interest in or charge on the property. (Paraphrased for illustration.)", relevance: "Explains why the buyer must sue to compel performance." },
    { id: "lim-113", kind: "statute", title: "Limitation Act, 1908", provision: "Article 113", passage: "A suit for specific performance must be filed within the prescribed period counted from the date fixed for performance, or from notice of refusal. (Paraphrased for illustration.)", relevance: "Sets the deadline for the suit." },
    { id: "case-pld-2021-sc-xxx", kind: "case", title: "PLD 2021 SC XXX", court: "Supreme Court of Pakistan", passage: "Illustrative passage: the Court held that the buyer must show continued readiness and willingness to pay the balance.", principle: "Readiness and willingness must be shown throughout.", relevance: "States the buyer's burden." },
    { id: "case-2020-scmr-xxx", kind: "case", title: "2020 SCMR XXX", court: "Supreme Court of Pakistan", passage: "Illustrative passage: the Court examined the receipt and the surrounding conduct to decide whether the advance was proved.", principle: "Payment of an advance is proved on the record as a whole.", relevance: "Shows how the advance is established." },
  ],
};

export const ANSWER_TEMPLATES: Record<AnswerTemplateId, LegalAnswer> = {
  divorce,
  guardianship,
  criminal,
  property,
};
