export interface PracticeArea {
  id: string;
  name: string;
  subcategories: string[];
}

export interface CaseType {
  slug: string;
  title: string;
  practiceArea: string;
  subcategory: string;
  status: "available" | "high-volume" | "urgent" | "limited";
  summary: string;
  description: string;
  eligibilityPoints: string[];
  documents: string[];
  caseValue: string;
  purchasePrice: number;
  geography: string[];
  priority: "high" | "medium" | "low";
  recentUpdate?: string;
}

export interface LegalUpdate {
  id: string;
  title: string;
  caseSlug?: string;
  category: string;
  date: string;
  summary: string;
  content: string;
}

export const practiceAreas: PracticeArea[] = [
  {
    id: "injury-accidents",
    name: "Personal Injury & Accidents",
    subcategories: [],
  },
  {
    id: "work-benefits",
    name: "Work & Benefits",
    subcategories: [],
  },
  {
    id: "mass-torts",
    name: "Mass Torts & Product Liability",
    subcategories: [],
  },
  {
    id: "institutional-abuse",
    name: "Institutional / Platform Abuse",
    subcategories: [],
  },
  {
    id: "other",
    name: "Other",
    subcategories: [],
  },
];

const launchCaseSlugs = new Set([
  "motor-vehicle-accidents",
  "ssdi-ssi-claims",
  "premises-slip-fall",
  "dog-bites-animal-attacks",
]);

const allCases: CaseType[] = [
  {
    slug: "motor-vehicle-accidents",
    title: "Motor Vehicle Accidents (Auto & Motorcycle)",
    practiceArea: "injury-accidents",
    subcategory: "",
    status: "available",
    summary: "Clear-liability auto and motorcycle cases with meaningful injuries and collectible insurance.",
    description:
      "These are motor-vehicle cases a firm can review quickly: rear-end collisions, DUI crashes, left-turn crashes, and other police-documented liability scenarios. The strongest fits combine clear fault, real treatment, and coverage of at least $100K.",
    eligibilityPoints: [
      "Clear liability: rear-end, left-turn violations, DUI, or cited at-fault driver",
      "Injuries requiring ER visit, hospitalization, surgery, or documented treatment",
      "Medical bills ≥$10K",
      "Policy limits ≥$100K or plaintiff UM/UIM coverage ≥$100K",
      "Incident within 2 years (varies by state)",
      "No comparative fault >50% in modified comparative states",
    ],
    documents: [
      "Police crash report",
      "Complete medical records",
      "Insurance policy declarations",
      "UM/UIM policy if applicable",
      "Lost wage verification documents",
      "Vehicle and injury photographs",
      "Toxicology results if DUI involved",
    ],
    caseValue: "$50K - $250K",
    purchasePrice: 0,
    geography: ["All 50 states"],
    priority: "medium",
  },
  {
    slug: "ssdi-ssi-claims",
    title: "SSDI / SSI Disability Claims",
    practiceArea: "work-benefits",
    subcategory: "",
    status: "available",
    summary: "Denied disability claims with strong medical records and a clear path to appeal.",
    description:
      "These claims work best when the file already tells a simple story: the claimant cannot keep working, the treatment history is well documented, and the next appeal step is close. The strongest fits often involve claimants age 50 and older, severe impairments, and records that show real functional limits.",
    eligibilityPoints: [
      "Severe medical condition preventing work for ≥12 months or terminal illness",
      "Medical documentation: treating physician records, specialists, hospitalizations",
      "Functional capacity limitations documented in medical records",
      "Work credits earned: SSDI requires 20 credits in last 10 years (varies by age)",
      "Prior denial or pending application requiring appeal within 60 days",
      "SSDI generally applies to adults under full retirement age who meet insured-status rules; SSI has no age restriction but does have income and asset limits",
    ],
    documents: [
      "Complete medical records from physicians",
      "Hospital and emergency records",
      "Mental health treatment documentation",
      "Pharmacy medication records",
      "Social Security determination letters",
      "Work history and earnings records",
      "Function report questionnaires",
      "Vocational rehabilitation records",
    ],
    caseValue: "$30K - $100K",
    purchasePrice: 0,
    geography: ["All 50 states - Federal program"],
    priority: "medium",
    recentUpdate:
      "SSA Ruling 24-3p (Jan 2025) updated vocational expert evidence standards; 2025 COLA increased monthly benefits 2.5%",
  },
  {
    slug: "nursing-home-abuse",
    title: "Nursing Home Abuse & Neglect",
    practiceArea: "injury-accidents",
    subcategory: "",
    status: "limited",
    summary: "Nursing-home neglect cases with serious injuries, clear records, and signs the facility failed the resident.",
    description:
      "These matters focus on preventable harm inside nursing homes and assisted living facilities. Strong cases usually involve pressure ulcers, falls, dehydration, medication errors, or other serious decline backed by records, photos, and facility deficiencies.",
    eligibilityPoints: [
      "Stage 3-4 pressure ulcers developed in facility",
      "Preventable injury: falls with fracture, severe dehydration, medication errors",
      "Medical records showing decline and care plan deviations",
      "Facility deficiencies: low CMS ratings or state citations",
      "Resident deceased or incapacitated requiring guardian/POA",
      "No pre-dispute arbitration clause or voluntary arbitration agreement signed post-admission",
    ],
    documents: [
      "Complete facility medical records",
      "State survey inspection reports",
      "CMS rating and data",
      "Injury and condition photos",
      "Admission contract and agreements",
      "Autopsy report if applicable",
      "Pharmacy medication records",
      "Staffing and training records",
    ],
    caseValue: "$200K - $800K",
    purchasePrice: 0,
    geography: ["All 50 states"],
    priority: "high",
    recentUpdate:
      "CMS 2019 rule prohibits mandatory arbitration as condition of admission; voluntary agreements may be challengeable on procedural grounds; consult state-specific arbitration laws",
  },
  {
    slug: "workers-compensation",
    title: "Workers' Compensation",
    practiceArea: "work-benefits",
    subcategory: "",
    status: "available",
    summary: "Work-injury cases with third-party liability beyond workers' comp.",
    description:
      "These are workplace-injury matters where someone other than the employer may be responsible. The best fits involve defective equipment, subcontractor negligence, OSHA-related failures, or vehicle crashes on the job, with serious injuries and a defendant that can actually pay.",
    eligibilityPoints: [
      "Catastrophic injury or medical bills >$50K",
      "Workplace injury involving non-employer third party",
      "Third-party liability provable through violations or defects",
      "Workers' comp claim filed or compensability established",
      "Adequate defendant insurance or assets",
      "Incident within 2-3 years",
    ],
    documents: [
      "Workers' comp claim file",
      "Employer incident report",
      "Complete medical records",
      "OSHA documentation and citations",
      "Equipment maintenance/inspection records",
      "Insurance certificates and policies",
      "Police reports if applicable",
    ],
    caseValue: "$150K - $500K",
    purchasePrice: 0,
    geography: ["All 50 states - Third-party claims available nationwide; high-volume states include TX, CA, FL, NY, IL, GA, AZ"],
    priority: "medium",
    recentUpdate:
      "2025 construction accident settlements averaging $1.2M+ for third-party equipment defects; OSHA penalties increased for 2025; enhanced penalties for repeat violators strengthening third-party liability claims",
  },
  {
    slug: "premises-slip-fall",
    title: "Slip & Fall (Surgical Injury)",
    practiceArea: "injury-accidents",
    subcategory: "",
    status: "limited",
    summary: "Slip-and-fall cases with surgery, clear hazards, and damages large enough to matter.",
    description:
      "These are not minor stumble claims. The strongest cases pair a documented hazard with surgery-level injuries such as fractures, rotator cuff tears, or spinal damage, ideally on commercial property with strong photos, notice evidence, and meaningful coverage.",
    eligibilityPoints: [
      "Surgical intervention performed: ORIF (fracture repair), arthroscopy (rotator cuff, meniscus, labral tear), or spinal injection/surgery",
      "Objective injury via imaging: X-ray showing fracture, MRI showing tear, CT showing compression fracture",
      "Hazard documented: foreign substance (liquid, ice, debris), defective floor (cracked, uneven), or inadequate lighting",
      "Notice provable: defendant created condition, or constructive notice (condition existed long enough per reasonable inspection standard)",
      'No "open and obvious" defense: hazard not readily apparent, or distraction exception applies',
      "Incident within the applicable statute of limitations (for example: NY 3 years, CA/FL/TX 2 years, LA 2 years, KY/TN 1 year)",
    ],
    documents: [
      "Photos of hazard immediately post-fall",
      "ER, X-ray, MRI, surgical records",
      "Incident report if filed",
      "Surveillance video (request immediately)",
      "Maintenance and inspection logs",
      "Witness contact information and statements",
      "Weather reports if applicable",
      "Footwear analysis and photos",
    ],
    caseValue: "$100K - $400K",
    purchasePrice: 0,
    geography: ["All 50 states - Premises liability laws exist in all jurisdictions; favorable precedent in CA, NY, IL, TX, FL, NJ"],
    priority: "medium",
  },
  {
    slug: "dog-bites-animal-attacks",
    title: "Dog Bites & Animal Attacks",
    practiceArea: "injury-accidents",
    subcategory: "",
    status: "available",
    summary: "Dog-bite cases with severe injuries, visible scarring, and reachable insurance.",
    description:
      "The best dog-bite files involve deep wounds, facial scarring, surgery, or child victims, plus a homeowner or renter policy that can fund the claim. Cases become especially attractive when the owner is identified, the attack is documented, and there is no strong provocation defense.",
    eligibilityPoints: [
      "Severe injuries: facial scarring requiring plastic surgery, deep punctures/lacerations requiring ER/sutures, fractures (if knocked down), nerve damage, or infection (MRSA, sepsis)",
      "Owner identified with homeowner/renter insurance (verify coverage; many policies exclude specific breeds)",
      "Strict liability states preferred (CA, IL, FL, NJ, WA): no need to prove prior knowledge",
      'One-bite states (TX, NY, GA): prior bite history, animal control complaints, or "Beware of Dog" signs proving knowledge',
      "Child victims (higher damages due to permanent scarring, emotional trauma)",
      "No provocation defense: victim not trespassing, teasing, or harming dog (weakens case)",
    ],
    documents: [
      "ER and surgical medical records",
      "Bite wound and scar photos",
      "Animal control bite incident report",
      "Owner homeowner insurance policy",
      "Witness statements about attack",
      "Prior animal control complaints",
      "Property access documentation",
    ],
    caseValue: "$50K - $250K",
    purchasePrice: 0,
    geography: ["All 50 states - Strict liability states (CA, IL, FL, NJ, WA) preferred"],
    priority: "medium",
  },
  {
    slug: "social-media-addiction",
    title: "Social Media Addiction & Mental Harm (Meta, TikTok, Snapchat)",
    practiceArea: "mass-torts",
    subcategory: "",
    status: "limited",
    summary: "Youth mental-health cases tied to prolonged social-media use and platform design.",
    description:
      "These cases focus on minors and young adults who allegedly suffered serious mental-health harm after heavy use of Instagram, Facebook, TikTok, Snapchat, or similar platforms. The strongest files connect sustained use with diagnoses, crisis events, and records that help show causation.",
    eligibilityPoints: [
      "Minor (<18) or young adult (18-25) with heavy social media use (≥3 hrs/day for ≥1 year)",
      "Platform use: Instagram, TikTok, Snapchat, Facebook, YouTube",
      "Severe mental health diagnosis: depression, anxiety, eating disorder, body dysmorphic disorder",
      "Hospitalization or ER treatment for suicide attempt, self-harm, or psychiatric admission",
      "Documented causation linking social media to symptoms",
      "Exclude pre-existing severe mental illness or major trauma",
    ],
    documents: [
      "Mental health records with diagnosis",
      "Hospital and ER records",
      "Social media usage data reports",
      "School counselor documentation",
      "Family usage pattern declarations",
      "Behavioral change evidence",
    ],
    caseValue: "$300K - $1.5M",
    purchasePrice: 0,
    geography: ["All 50 states"],
    priority: "high",
    recentUpdate:
      "42 state AGs sued Meta Oct 2023; 400+ school districts filed in 2023-24; CA JCCP 5397 consolidation ongoing",
  },
  {
    slug: "roblox-child-exploitation",
    title: "Roblox Child Grooming & Sexual Exploitation",
    practiceArea: "mass-torts",
    subcategory: "",
    status: "high-volume",
    summary:
      "Roblox exploitation cases involving child grooming, platform contact, and serious downstream harm.",
    description:
      "These matters center on claims that Roblox contact opened the door to grooming, sextortion, or real-world abuse. The strongest files show platform contact, migration to other apps, and records that tie the abuse period to lasting trauma.",
    eligibilityPoints: [
      "Minor (<18) groomed or exploited through Roblox platform contact",
      "Grooming pattern: Roblox chat contact migrating to Discord, Snapchat, or other platforms",
      "Harm: sexual exploitation, sextortion, real-world abuse, kidnapping attempt, or severe psychological trauma",
      "Documented Roblox account activity during abuse period",
      "Evidence: therapy records, police reports, chat logs, screenshots, or platform data",
      "Within statute of limitations (many states extended SOL for childhood sexual abuse)",
    ],
    documents: [
      "Roblox account information and activity logs",
      "Chat logs, screenshots, or communications evidence",
      "Police reports or criminal investigations",
      "Medical and mental health treatment records",
      "Therapy/counseling documentation",
      "School records showing behavioral changes",
      "Parental control settings and bypass evidence",
      "Platform data requests (account history, friend lists, in-game interactions)",
    ],
    caseValue: "$400K - $2M",
    purchasePrice: 0,
    geography: ["All 50 states"],
    priority: "high",
    recentUpdate:
      "Louisiana AG filed consumer protection suit Aug 2025; 400+ victims represented in ongoing litigation; platform safety under increased regulatory scrutiny",
  },
  {
    slug: "school-university-abuse-title-ix",
    title: "School & University Abuse (Title IX)",
    practiceArea: "institutional-abuse",
    subcategory: "",
    status: "available",
    summary:
      "School and university abuse cases where the institution knew enough to act and failed to protect students.",
    description:
      "These cases target schools and universities that ignored reports, protected the wrong person, or left students exposed to known risk. Strong files usually involve staff abuse, coach misconduct, or peer assault followed by a weak or delayed response from the institution.",
    eligibilityPoints: [
      "Sexual abuse/assault by teacher, coach, administrator, staff, or student on student",
      "Abuse severe, pervasive, or objectively offensive denying equal educational access",
      "School had actual knowledge of harassment/abuse and was deliberately indifferent",
      "Reports made to school officials (Title IX coordinator, principal, dean) with inadequate response",
      "Title IX federally-funded institution (nearly all K-12 schools and universities)",
      "Incident within statute of limitations (varies by state: CA 3 years, NY 3 years from discovery, TX 2 years)",
    ],
    documents: [
      "School incident reports",
      "Title IX complaint filings",
      "Disciplinary records",
      "Police reports",
      "Medical/counseling records",
      "Witness statements",
      "School correspondence and emails",
      "Expert educational policy analysis",
    ],
    caseValue: "$250K - $1.25M",
    purchasePrice: 0,
    geography: ["All 50 states - Federal Title IX coverage"],
    priority: "medium",
    recentUpdate:
      "2024 Title IX regulations vacated by federal court Jan 2025 reinstating 2020 rules; regulatory uncertainty continues as institutions revert to prior policies",
  },
  {
    slug: "institutional-child-abuse",
    title: "Youth Organization & Sports Abuse (SafeSport)",
    practiceArea: "institutional-abuse",
    subcategory: "",
    status: "limited",
    summary:
      "Child-abuse cases against youth programs, athletics organizations, foster placements, and group homes.",
    description:
      "This intake category is built for abuse tied to youth programs, sports organizations, foster placements, and licensed group homes. The strongest matters show more than individual wrongdoing: ignored complaints, weak screening, unsafe placement decisions, or a pattern the organization failed to stop.",
    eligibilityPoints: [
      "Minor victim during participation in youth org, athletics program, foster placement, or licensed group home",
      "Abuse by leader, coach, staff, foster parent, or volunteer; or peer-on-peer enabled by negligence",
      "Organizational negligence: ignored/failed to act on complaints; inadequate screening/supervision; unsafe policies",
      "Evidence: program/placement records, complaints, medical/therapy records, witness statements",
      "Within SOL or qualifying for state revival window",
    ],
    documents: [
      "Membership/placement and program records",
      "Complaints/incident reports and agency investigations",
      "Medical and therapy documentation",
      "SafeSport/organizational policy materials",
      "Witness statements and contemporaneous evidence",
    ],
    caseValue: "$350K - $1.75M",
    purchasePrice: 0,
    geography: ["All 50 states"],
    priority: "high",
    recentUpdate:
      "BSA settlement administration ongoing; USA Gymnastics/DOJ settlements and SafeSport enforcement increasing; state foster-care class actions continue nationwide.",
  },
  {
    slug: "medical-therapy-abuse",
    title: "Medical & Therapy Abuse",
    practiceArea: "institutional-abuse",
    subcategory: "",
    status: "available",
    summary:
      "Abuse by medical and mental-health providers who exploited trust, access, and authority.",
    description:
      "These cases involve doctors, therapists, dentists, psychologists, and other providers who crossed clear professional boundaries. Strong files often include treatment records, appointment history, billing records, and evidence that the provider used the clinical relationship to exploit a vulnerable patient.",
    eligibilityPoints: [
      "Sexual contact/assault by licensed healthcare provider during professional relationship",
      "Abuse during: medical exam, therapy session, treatment, or exploitation of patient vulnerability",
      "Provider types: physician, psychiatrist, psychologist, therapist, counselor, dentist, chiropractor",
      'Professional boundary violations: romantic/sexual relationship presented as "therapeutic"',
      "Patient vulnerability: mental health issues, trauma history, or power imbalance exploitation",
      "Medical board complaints filed or criminal investigations (strengthens case but not required)",
    ],
    documents: [
      "Complete medical/therapy records",
      "Appointment schedules proving relationship",
      "Billing records",
      "Licensing board complaints",
      "Police reports",
      "Witness statements",
      "Expert witness declarations on standard of care violations",
      "Subsequent therapy records documenting trauma",
    ],
    caseValue: "$350K - $1.75M",
    purchasePrice: 0,
    geography: ["All 50 states"],
    priority: "medium",
    recentUpdate:
      "State medical board reform legislation advancing in multiple states; increased licensing board scrutiny following high-profile cases; criminal prosecution timelines remain short (1 year in many states)",
  },
  {
    slug: "hotel-hospitality-assaults",
    title: "Hotel & Hospitality Assaults",
    practiceArea: "institutional-abuse",
    subcategory: "",
    status: "available",
    summary:
      "Hotel and resort assault cases tied to poor security, unsafe access, or employee misconduct.",
    description:
      "These matters focus on hospitality businesses that failed to protect guests. The best files involve employee assault, master-key misuse, wrong-room placement, or third-party attacks where the hotel ignored obvious security problems or prior warning signs.",
    eligibilityPoints: [
      "Sexual assault on hotel/resort property by employee or third party",
      "Severe injuries: rape, attempted rape, or assault causing PTSD requiring treatment",
      "Employee assault: security guard, maintenance worker, front desk staff using master key/access",
      "Third-party assault: inadequate security despite known crime area or prior incidents",
      "Hotel negligence: failed background checks, inadequate security measures, or improper room assignment",
      "Documented evidence: police report, security footage, key card logs, incident reports",
    ],
    documents: [
      "Police sexual assault report",
      "Hotel incident reports",
      "Security camera footage",
      "Key card access logs",
      "SANE medical examination",
      "Therapy records",
      "Hotel employee background checks",
      "Area crime statistics",
      "Expert security analysis",
    ],
    caseValue: "$400K - $2M",
    purchasePrice: 0,
    geography: ["All 50 states"],
    priority: "high",
    recentUpdate:
      "Major verdicts in 2024-2025 increasing hospitality industry accountability; industry implementing enhanced security protocols",
  },
  {
    slug: "religious-institution-abuse",
    title: "Religious Institution Abuse (Clergy & Non-Clergy)",
    practiceArea: "institutional-abuse",
    subcategory: "",
    status: "limited",
    summary:
      "Religious-institution abuse cases involving clergy or staff and organizational failure to stop it.",
    description:
      "These cases go beyond the individual abuser and ask what the institution knew, ignored, transferred, or concealed. Strong files involve churches, missions, religious schools, or counseling programs where leadership failed to supervise, screen, or respond to prior complaints.",
    eligibilityPoints: [
      "Abuse in a religious context by clergy (priest, minister, pastor, deacon) or non-clergy (teacher, counselor, missionary, camp staff)",
      "Abuse occurred during religious activities, on property, or via authority/pastoral role",
      "Institutional liability: leadership knew or should have known; prior complaints or transfers; inadequate screening/supervision",
      "Childhood claims preferred; adult counseling/authority exploitation considered",
      "Within state SOL or qualifying for revival/lookback window",
    ],
    documents: [
      "Therapy/counseling and medical records",
      "Police/criminal investigation reports (if any)",
      "Organizational personnel files and prior complaints",
      "Enrollment/participation or mission records",
      "Witness affidavits and contemporaneous notes/letters",
    ],
    caseValue: "$400K - $2M",
    purchasePrice: 0,
    geography: ["All 50 states"],
    priority: "high",
    recentUpdate:
      "State SOL laws vary significantly; California AB 2777 extended revival window through Dec 2026 for adult claims; Southern Baptist litigation expanding nationwide; check state-specific deadlines",
  },
  {
    slug: "transportation-rideshare-assaults",
    title: "Transportation & Rideshare Assaults",
    practiceArea: "institutional-abuse",
    subcategory: "",
    status: "limited",
    summary:
      "Rideshare and transportation assault cases with app records and corporate-safety issues.",
    description:
      "These cases involve assaults by Uber, Lyft, taxi, or other transportation drivers, with claims focused on weak screening, complaint handling, and rider-safety systems. The strongest files include trip records, location data, medical support, and facts showing the company had preventable gaps in its safety process.",
    eligibilityPoints: [
      "Sexual assault during Uber, Lyft, or taxi ride by driver",
      "Assault types: rape, attempted rape, unwanted touching, indecent exposure, kidnapping/false imprisonment",
      "Trip documented through app records, receipts, GPS data",
      "Medical examination or therapy records documenting assault trauma",
      "Police report filed (preferred but not required if safety concerns prevented reporting)",
      "Company negligence: driver had prior complaints, failed background check gaps, or inadequate safety features",
    ],
    documents: [
      "Rideshare trip receipts and GPS data",
      "Police sexual assault report",
      "SANE (Sexual Assault Nurse Examiner) medical exam",
      "Therapy/counseling records",
      "Driver background check records",
      "Prior complaint history",
      "App screenshots and communications",
    ],
    caseValue: "$500K - $2.5M",
    purchasePrice: 0,
    geography: ["All 50 states"],
    priority: "high",
    recentUpdate:
      "Uber MDL litigation ongoing; California AB 2777 (2022) extends SOL for adult sexual assault claims through Dec 2026; multiple $10M+ individual verdicts in 2023-2024",
  },
  {
    slug: "correctional-facility-abuse",
    title: "Correctional Facility / Jail Abuse",
    practiceArea: "institutional-abuse",
    subcategory: "",
    status: "available",
    summary:
      "Correctional-facility abuse cases involving staff misconduct, retaliation, and broken PREA safeguards.",
    description:
      "These matters focus on prisons and jails that failed to protect people in custody from sexual abuse by staff or medical personnel. Strong cases often include PREA reports, grievances, medical records, or investigative findings showing abuse, retaliation, or a wider institutional failure.",
    eligibilityPoints: [
      "Sexual abuse/assault while incarcerated by correctional officer, staff, or medical personnel",
      "Severe abuse: rape, coerced sexual acts under threat, or pattern of harassment",
      "PREA violations: staff sexual misconduct, failure to investigate, retaliation for reporting",
      "Documented evidence: PREA reports, grievances filed, OIG investigations, medical examinations",
      "Federal cases: FTCA claims against BOP; state cases vary by sovereign immunity waivers",
      "Recent abuse: cases within 2 years for federal FTCA (can extend with discovery rule)",
    ],
    documents: [
      "PREA investigation reports",
      "Inmate grievances",
      "OIG reports",
      "Medical examination records",
      "Therapy records",
      "Facility surveillance footage",
      "Witness statements from other inmates/staff",
      "Facility inspection reports",
    ],
    caseValue: "$350K - $1.5M",
    purchasePrice: 0,
    geography: ["All 50 states - Federal PREA coverage"],
    priority: "medium",
    recentUpdate:
      "FCI Dublin $116M settlement Dec 2024; increased DOJ scrutiny of federal facilities; multiple facilities under investigation",
  },
  {
    slug: "sex-trafficking-exploitation",
    title: "Sex Trafficking & Exploitation",
    practiceArea: "institutional-abuse",
    subcategory: "",
    status: "available",
    summary:
      "Trafficking cases against businesses that facilitated, ignored, or profited from exploitation.",
    description:
      "These civil cases target hotels, websites, transportation companies, and other businesses that allegedly helped trafficking continue or looked away while it happened. The strongest files show repeated red flags, business benefit, and records that connect the defendant to the exploitation.",
    eligibilityPoints: [
      "Victim of sex trafficking as minor (<18) or adult (through force, fraud, or coercion)",
      "Severe exploitation: forced prostitution, coerced commercial sex acts, debt bondage",
      "Defendant facilitation: hotel knowingly hosted trafficking, website advertised services, venue ignored signs",
      "Evidence of trafficking: repeated bookings at same hotels, online advertisements, victim testimony",
      "Defendant knowledge: actual knowledge or willful blindness to trafficking indicators",
      "TVPA claims or state trafficking statutes (CA, TX, FL, NY have strong civil trafficking laws)",
    ],
    documents: [
      "Police trafficking investigations",
      "Hotel booking records",
      "Online advertisement archives",
      "Medical records documenting injuries",
      "Therapy/counseling records",
      "Witness testimony",
      "Financial transaction records",
      "Expert trafficking testimony",
    ],
    caseValue: "$500K - $2.5M",
    purchasePrice: 0,
    geography: ["All 50 states - Federal TVPA coverage"],
    priority: "high",
    recentUpdate:
      "Hotel human trafficking lawsuits increasing; FOSTA-SESTA legislation (2018) strengthens liability for online platforms; multiple multimillion-dollar settlements 2023-2024",
  },
  {
    slug: "adult-sexual-assault-workplace",
    title: "Adult Sexual Assault (Workplace / Venue / #MeToo)",
    practiceArea: "institutional-abuse",
    subcategory: "",
    status: "available",
    summary:
      "Workplace and venue assault cases with employer notice, weak response, or retaliation.",
    description:
      "These matters cover sexual assault, harassment, and hostile-work-environment claims in employment and professional settings. The strongest files show repeated conduct, a complaint that went nowhere, retaliation, or an employer that knew enough to act and still failed to protect the victim.",
    eligibilityPoints: [
      "Sexual harassment or assault in employment context by supervisor, coworker, or client",
      "Hostile work environment: severe or pervasive conduct affecting work conditions",
      "Quid pro quo: employment benefits conditioned on sexual favors",
      "Employer liability: knew or should have known and failed to take corrective action",
      "EEOC complaint filed within 180-300 days (federal) or state agency complaint (extends timelines)",
      "State law claims: assault, battery, IIED (Intentional Infliction of Emotional Distress)",
    ],
    documents: [
      "EEOC charge and determination letter",
      "Workplace complaints and HR reports",
      "Emails and text message evidence",
      "Witness statements",
      "Performance reviews",
      "Medical/therapy records",
      "Expert employment law testimony",
    ],
    caseValue: "$150K - $750K",
    purchasePrice: 0,
    geography: ["All 50 states - Federal Title VII coverage"],
    priority: "medium",
    recentUpdate:
      "Several states banned forced arbitration for sexual harassment claims; #MeToo movement continues driving policy changes; EEOC harassment guidance updated 2024",
  },
];

export const cases: CaseType[] = allCases.filter((caseItem) => launchCaseSlugs.has(caseItem.slug));

export const updates: LegalUpdate[] = [];
