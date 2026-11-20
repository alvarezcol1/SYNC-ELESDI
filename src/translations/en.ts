/**
 * English dictionary — the source of truth for the translation shape.
 * Every other language must satisfy `Dictionary` (see ./types.ts), so a
 * missing or extra key is a TypeScript error rather than a runtime gap.
 *
 * Content rules (from the project brief):
 *  - EFFECTIVE is an agency, never the insurance carrier.
 *  - No invented statistics, testimonials, licenses, guarantees, or speed claims.
 *  - No nationwide claims; New York is excluded.
 */
export const en = {
  meta: {
    title: 'EFFECTIVE Insurance Agency | Commercial Trucking Insurance, Dallas TX',
    description:
      'Dallas-based insurance agency helping owner-operators, trucking companies, and fleets explore commercial auto liability, cargo, physical damage, and more.',
  },
  a11y: {
    skip: 'Skip to main content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    language: 'Language',
    primaryNav: 'Primary',
    footerNav: 'Footer',
    opensWhatsApp: '(opens WhatsApp in a new tab)',
    logoPlaceholder: 'Temporary wordmark — official logo pending',
    close: 'Close',
  },
  nav: {
    home: 'Home',
    solutions: 'Insurance Solutions',
    serve: 'Who We Serve',
    about: 'About',
    contact: 'Contact',
    quote: 'Get a Quote',
  },
  hero: {
    eyebrow: 'Commercial transportation insurance · Dallas, Texas',
    titleLine1: 'Your business moves.',
    titleLine2: 'We help you stay prepared.',
    body: 'Commercial insurance solutions for owner-operators, trucking companies, and transportation businesses.',
    ctaPrimary: 'Get a Quote',
    ctaSecondary: 'Explore Our Solutions',
    scroll: 'Scroll to explore',
    sceneLabel:
      'A tractor-trailer driving a highway at dusk, its marker lights glowing, framed by a fine network of connected points.',
    nodes: ['Liability', 'Cargo', 'Physical Damage', 'Umbrella'],
  },
  solutions: {
    eyebrow: 'Insurance Solutions',
    title: 'Coverage built around the way you operate.',
    intro:
      'We work with insurance providers to help you explore options across the core lines a transportation business typically considers. Every line is subject to underwriting and state availability.',
    cta: 'Ask about this coverage',
    items: {
      autoLiability: {
        tag: 'On the road',
        title: 'Commercial Auto Liability',
        short:
          'Helps cover bodily injury and property damage to others when your commercial vehicle is involved in an accident.',
        detail:
          'Often the foundation of a trucking program. Federal or state filing requirements may apply to your operation.',
        visualLabel: 'Schematic of a tractor unit on a highway with protective boundary lines',
      },
      cargo: {
        tag: 'The load',
        title: 'Motor Truck Cargo',
        short:
          'Helps protect the freight you haul against covered loss or damage while it is in your care.',
        detail: 'Commodity types, limits, and exclusions vary by policy and insurer.',
        visualLabel: 'Schematic of a trailer interior with palletized freight',
      },
      physicalDamage: {
        tag: 'Your equipment',
        title: 'Physical Damage',
        short:
          'Helps cover your own tractor or trailer for collision and covered perils such as fire or theft.',
        detail: 'Deductibles, valuation method, and covered perils depend on the policy.',
        visualLabel: 'Schematic of a tractor cab with measurement and inspection lines',
      },
      generalLiability: {
        tag: 'Off the road',
        title: 'General Liability',
        short:
          'Helps cover third-party claims from your business premises and operations — not from driving your vehicles.',
        detail:
          'Think yard, office, or loading dock incidents. Vehicle-related claims belong to auto liability.',
        visualLabel: 'Schematic of a loading dock and business premises',
      },
      workersComp: {
        tag: 'Your people',
        title: "Workers' Compensation",
        short:
          'Helps cover medical costs and lost wages for employees injured or made ill on the job.',
        detail: 'Requirements differ by state, including how they apply to drivers and contractors.',
        visualLabel: 'Schematic of a driver figure beside a cab step and handrail',
      },
      umbrella: {
        tag: 'Above it all',
        title: 'Commercial Umbrella',
        short:
          'Adds liability limits above eligible underlying policies when a claim exceeds them.',
        detail: 'Requires qualifying underlying coverage and is subject to insurer approval.',
        visualLabel: 'Schematic of layered coverage planes stacked above a truck',
      },
    },
    distinction: {
      title: 'Auto liability and general liability are not the same.',
      autoLabel: 'Commercial Auto Liability',
      autoText: 'Claims arising from operating your commercial vehicles.',
      glLabel: 'General Liability',
      glText: 'Claims arising from your premises and non-driving business operations.',
    },
  },
  serve: {
    eyebrow: 'Who We Serve',
    title: 'Different operations. Different realities.',
    intro:
      'A single-truck authority and a multi-unit fleet face different questions. We start by understanding which one you are.',
    items: [
      {
        id: 'owner',
        label: '01',
        title: 'Owner-Operators',
        body: 'You are the driver, the dispatcher, and the business owner. Coverage decisions land on you — so clear explanations matter.',
        points: [
          'Running under your own authority or leased on',
          'Protecting the truck that is your livelihood',
          'Straight answers in English or Spanish',
        ],
        visualLabel: 'A single tractor-trailer on an open highway',
      },
      {
        id: 'company',
        label: '02',
        title: 'Trucking Companies',
        body: 'Drivers, equipment, contracts, and compliance move together. Your coverage review should look at the whole operation.',
        points: [
          'Several lines of coverage to coordinate',
          'Shipper and broker certificate requests',
          'Employees, yards, and terminals to consider',
        ],
        visualLabel: 'Several trucks parked at a terminal',
      },
      {
        id: 'fleet',
        label: '03',
        title: 'Fleet Businesses',
        body: 'Vehicles are part of how you deliver your service, whether you haul freight or not. We help you see where commercial exposures sit.',
        points: [
          'Mixed vehicle types and uses',
          'Changing unit counts and drivers',
          'Liability on and off the road',
        ],
        visualLabel: 'A fleet of commercial vehicles in formation',
      },
    ],
  },
  why: {
    eyebrow: 'Why EFFECTIVE',
    title: 'Guidance first. Then options.',
    statement:
      'Insurance for a moving business should be explained, not just sold. Our role is to help you understand your choices and connect you with insurance options that fit.',
    items: [
      {
        title: 'Professional guidance',
        body: 'We walk through coverage categories with you so you know what each one is for before you decide.',
      },
      {
        title: 'Clear communication',
        body: 'Plain language, in English or Spanish. If something is subject to underwriting, we say so.',
      },
      {
        title: 'Options through provider relationships',
        body: 'As an agency, we work with insurance providers to explore options that may be available to your operation.',
      },
      {
        title: 'Transportation focus',
        body: 'Our attention is on commercial transportation — the vehicles, freight, and responsibilities that come with it.',
      },
      {
        title: 'A customer-oriented process',
        body: 'Your questions shape the conversation. We move at the pace your decisions need.',
      },
    ],
  },
  process: {
    eyebrow: 'How It Works',
    title: 'Four steps from question to decision.',
    steps: [
      {
        title: 'Tell us about your business.',
        body: 'Share your operation type, vehicles, radius, cargo, and the coverage you are interested in.',
      },
      {
        title: 'Explore available options.',
        body: 'We review your information and look at options that may be available through insurance providers.',
      },
      {
        title: 'Review your quote.',
        body: 'When a quote is available, we go over coverages, limits, deductibles, and terms with you.',
      },
      {
        title: 'Take the next step.',
        body: 'If you decide to move forward, we guide you through the application and documents required.',
      },
    ],
    note: 'Quotes and policy issuance depend on the information provided, insurer review and underwriting, and applicable state requirements. Submitting a request does not bind or guarantee coverage.',
  },
  about: {
    eyebrow: 'About EFFECTIVE',
    title: 'An agency built for businesses that keep moving.',
    paragraphs: [
      'EFFECTIVE Insurance Agency LLC is an insurance agency based in Dallas, Texas, focused on commercial transportation and trucking.',
      'We are not an insurance company. We help transportation businesses understand their coverage needs and explore insurance options through our relationships with insurance providers.',
    ],
    missionLabel: 'Our mission',
    mission:
      'Help transportation businesses explore commercial insurance solutions and move forward with greater confidence.',
    facts: [
      { label: 'Based in', value: 'Dallas, Texas' },
      { label: 'Focus', value: 'Commercial transportation' },
      { label: 'Languages', value: 'English · Español' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions we hear often.',
    items: [
      {
        q: 'Is EFFECTIVE an insurance company?',
        a: 'No. EFFECTIVE Insurance Agency LLC is an insurance agency. Policies are issued by insurance providers, and coverage decisions are made by those insurers.',
      },
      {
        q: 'What is the difference between commercial auto liability and general liability?',
        a: 'Commercial auto liability responds to claims arising from operating your commercial vehicles, such as injuring someone or damaging their property in an accident. General liability responds to claims arising from your premises and non-driving business operations. They are separate coverages.',
      },
      {
        q: 'Does liability insurance cover damage to my own truck?',
        a: 'Generally, no. Liability coverage responds to damage you cause to others. Damage to your own tractor or trailer is typically addressed by physical damage coverage, subject to policy terms and deductibles.',
      },
      {
        q: 'What information do I need to request a quote?',
        a: 'Typically: business and contact details, your state of operation, vehicle and trailer information, driver details, the type of cargo you haul, your operating radius, and any prior insurance or loss history. We will let you know if anything else is needed.',
      },
      {
        q: 'How long does it take to receive a quote?',
        a: 'It depends on your operation, the completeness of your information, and insurer review. We will keep you informed, but we cannot promise a specific turnaround.',
      },
      {
        q: 'Are all coverages available in every state?',
        a: 'No. Availability depends on the state, the insurer, and your operation. We do not currently offer services in New York.',
      },
      {
        q: 'Can I get help in Spanish?',
        a: 'Yes. We assist customers in English and Spanish.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's get your quote started.",
    intro:
      'Send us a few details, call us, or start a WhatsApp conversation. We will follow up to understand your operation.',
    phoneLabel: 'Call us',
    whatsappLabel: 'WhatsApp',
    whatsappCta: 'Start a WhatsApp chat',
    locationLabel: 'Location',
    location: 'Dallas, Texas',
    languagesLabel: 'Languages',
    languages: 'English and Spanish',
    whatsappDefault:
      'Hello EFFECTIVE Insurance Agency, I would like to request information about commercial insurance solutions for my business.',
    form: {
      title: 'Quote request',
      requiredHint: 'Fields marked * are required.',
      name: 'Full name',
      phone: 'Phone',
      email: 'Email',
      businessType: 'Business type',
      state: 'Base state',
      interest: 'Insurance interest',
      message: 'Message',
      messagePlaceholder: 'Tell us about your trucks, cargo, and operating radius (optional).',
      select: 'Select…',
      businessTypes: {
        owner: 'Owner-operator',
        company: 'Trucking company',
        fleet: 'Fleet business',
        other: 'Other transportation business',
      },
      interestNotSure: 'Not sure yet — I need guidance',
      submit: 'Continue to WhatsApp',
      submitEndpoint: 'Send request',
      submitting: 'Sending…',
      consent:
        'By continuing you agree to be contacted about your request. Submitting this form does not bind coverage.',
      errors: {
        required: 'This field is required.',
        name: 'Please enter your full name.',
        phone: 'Please enter a valid phone number (at least 10 digits).',
        email: 'Please enter a valid email address.',
        state: 'We do not currently offer services in New York.',
        summary: 'Please review the highlighted fields.',
      },
      handoff: {
        title: 'Your request is ready to send.',
        body: 'WhatsApp should have opened with your details. Your message is not delivered until you press send in WhatsApp.',
        retry: 'Open WhatsApp again',
        reset: 'Start a new request',
        popupBlocked: 'If WhatsApp did not open, use the button below.',
      },
      success: {
        title: 'Request received.',
        body: 'Thank you. We have your details and will follow up. Timing depends on your request and insurer review.',
        reset: 'Send another request',
      },
      failure: {
        title: 'We could not send your request.',
        body: 'Please try again, or reach us directly by phone or WhatsApp.',
      },
      whatsappHeader:
        'Hello EFFECTIVE Insurance Agency, I would like to request a commercial insurance quote.',
      whatsappFields: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        businessType: 'Business type',
        state: 'Base state',
        interest: 'Interest',
        message: 'Message',
      },
    },
  },
  footer: {
    tagline: 'Intelligent protection in motion.',
    explore: 'Explore',
    solutions: 'Solutions',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms and Conditions',
    rights: 'All rights reserved.',
    disclosureTitle: 'Important information',
    disclosures: [
      'EFFECTIVE Insurance Agency LLC is an insurance agency, not an insurance company. Insurance products are offered through insurance providers.',
      'Coverage, availability, eligibility, terms, limits, exclusions, and pricing depend on insurer underwriting, policy conditions, state requirements, and applicable authorization. Not all coverages are available in all states. Services are not offered in New York.',
      'Descriptions on this website are general summaries, not policy language. Your policy documents govern coverage.',
    ],
  },
  legal: {
    privacyTitle: 'Privacy Policy',
    termsTitle: 'Terms and Conditions',
    placeholder:
      'This document is being prepared and will be published after legal review. For questions about how your information is handled, please contact us by phone.',
  },
};
