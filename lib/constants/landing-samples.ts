export type SourceKind = "Statute" | "Case law" | "Evidence";

export interface AnswerSegment {
  text: string;
  cite?: number;
}

export interface SampleStatute {
  reference: string;
  title: string;
  note: string;
}

export interface SampleCase {
  title: string;
  citation: string;
  holding: string;
}

export interface SampleSource {
  id: number;
  kind: SourceKind;
  label: string;
  detail: string;
}

export interface SampleResearch {
  id: string;
  domain: string;
  question: string;
  issue: string;
  answer: readonly AnswerSegment[];
  statutes: readonly SampleStatute[];
  cases: readonly SampleCase[];
  reasoning: string;
  sources: readonly SampleSource[];
}

export const SAMPLE_DISCLAIMER =
  "Demonstration content shown for illustrative purposes.";

export const SAMPLE_RESEARCH: readonly SampleResearch[] = [
  {
    id: "property",
    domain: "Property Law",
    question:
      "I paid an advance under a written agreement to sell a plot, but the seller now refuses to execute the sale deed. What are my options?",
    issue:
      "Whether an agreement to sell immovable property can be enforced by a suit for specific performance, and within what time.",
    answer: [
      {
        text: "An agreement to sell does not by itself transfer ownership, but a court may direct the seller to perform it where the contract is enforceable",
        cite: 1,
      },
      { text: ". The claim must be brought within the prescribed limitation period", cite: 2 },
      {
        text: ", and courts look for proof that the buyer was ready and willing to perform their side",
        cite: 3,
      },
      { text: "." },
    ],
    statutes: [
      {
        reference: "Specific Relief Act, 1877 — s. 12",
        title: "Cases in which specific performance is enforceable",
        note: "Identifies when a court may order a contract to be carried out.",
      },
      {
        reference: "Transfer of Property Act, 1882 — s. 54",
        title: "Sale defined",
        note: "A contract for sale does not itself create an interest in the property.",
      },
      {
        reference: "Limitation Act, 1908 — Art. 113",
        title: "Suit for specific performance",
        note: "Sets the period within which the suit must be filed.",
      },
    ],
    cases: [
      {
        title: "Sample Buyer v. Sample Seller",
        citation: "PLD 20XX SC 000",
        holding:
          "The buyer must show continued readiness and willingness to perform, including the ability to pay the balance.",
      },
    ],
    reasoning:
      "In the sample authority, the court examined the written agreement, the payment record and the buyer's conduct after the refusal. It treated the buyer's readiness to pay the balance as central, and considered whether the suit was filed within time.",
    sources: [
      {
        id: 1,
        kind: "Statute",
        label: "Specific Relief Act, 1877, s. 12",
        detail: "Provision text · retrieved passage",
      },
      {
        id: 2,
        kind: "Statute",
        label: "Limitation Act, 1908, Art. 113",
        detail: "Schedule entry · retrieved passage",
      },
      {
        id: 3,
        kind: "Case law",
        label: "Sample Buyer v. Sample Seller, PLD 20XX SC 000",
        detail: "Judgment excerpt · paragraph reference",
      },
    ],
  },
  {
    id: "criminal",
    domain: "Criminal Law",
    question:
      "A person has been arrested for a non-bailable offence and a bail petition is pending. What do courts consider?",
    issue:
      "The principles governing the grant of bail in non-bailable cases, and how the material on record is assessed at that stage.",
    answer: [
      {
        text: "In non-bailable cases, bail is decided by asking whether there are reasonable grounds for believing the accused is guilty of the offence alleged",
        cite: 1,
      },
      { text: ", read together with the constitutional safeguards on arrest and detention", cite: 2 },
      {
        text: ". Courts generally assess the tentative material on record without conducting a full trial",
        cite: 3,
      },
      { text: "." },
    ],
    statutes: [
      {
        reference: "Code of Criminal Procedure, 1898 — s. 497",
        title: "When bail may be taken in non-bailable cases",
        note: "Sets the test of reasonable grounds for believing guilt.",
      },
      {
        reference: "Constitution of Pakistan — Art. 10",
        title: "Safeguards as to arrest and detention",
        note: "Protections available to a person who has been arrested.",
      },
    ],
    cases: [
      {
        title: "Sample Applicant v. The State",
        citation: "20XX SCMR 000",
        holding:
          "Only a tentative assessment of the record is made at the bail stage; detailed appreciation of evidence is left to the trial.",
      },
    ],
    reasoning:
      "In the sample authority, the court looked at the allegations and the material collected so far, weighed whether reasonable grounds existed, and noted that findings at this stage do not bind the trial court.",
    sources: [
      {
        id: 1,
        kind: "Statute",
        label: "Code of Criminal Procedure, 1898, s. 497",
        detail: "Provision text · retrieved passage",
      },
      {
        id: 2,
        kind: "Statute",
        label: "Constitution of Pakistan, Art. 10",
        detail: "Fundamental rights · retrieved passage",
      },
      {
        id: 3,
        kind: "Case law",
        label: "Sample Applicant v. The State, 20XX SCMR 000",
        detail: "Judgment excerpt · paragraph reference",
      },
    ],
  },
  {
    id: "family",
    domain: "Family Law",
    question:
      "After separation, can a mother claim maintenance for her minor children, and where is that claim filed?",
    issue:
      "The legal basis for a claim of maintenance for minor children and the forum that hears family disputes.",
    answer: [
      {
        text: "A claim for maintenance of minor children can be brought before the Family Court, which has jurisdiction over such disputes",
        cite: 1,
      },
      {
        text: ". The court considers the means of the father and the needs of the children",
        cite: 2,
      },
      { text: "." },
    ],
    statutes: [
      {
        reference: "West Pakistan Family Courts Act, 1964 — s. 5",
        title: "Jurisdiction of Family Courts",
        note: "Lists the matters, including maintenance, decided by Family Courts.",
      },
      {
        reference: "Muslim Family Laws Ordinance, 1961 — s. 9",
        title: "Maintenance",
        note: "Addresses failure to maintain and the resulting proceedings.",
      },
    ],
    cases: [
      {
        title: "Sample Mother v. Sample Father",
        citation: "20XX CLC 000",
        holding:
          "Maintenance is fixed by reference to the father's means and the children's reasonable needs.",
      },
    ],
    reasoning:
      "In the sample authority, the court reviewed evidence of the father's income and the children's expenses before fixing a monthly amount, and considered whether it should rise over time.",
    sources: [
      {
        id: 1,
        kind: "Statute",
        label: "West Pakistan Family Courts Act, 1964, s. 5",
        detail: "Provision text · retrieved passage",
      },
      {
        id: 2,
        kind: "Case law",
        label: "Sample Mother v. Sample Father, 20XX CLC 000",
        detail: "Judgment excerpt · paragraph reference",
      },
    ],
  },
];
