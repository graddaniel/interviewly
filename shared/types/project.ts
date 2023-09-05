enum Methodology {
    Interview = 'interview',
    FocusGroups = 'focusGroups',
    OnlineCommunities = 'onlineCommunities',
    UXInterviews = 'uxInterviews',
    ProductTests = 'productTests'
};

enum Status {
    Draft = 'draft',
    AwaitingPayment = 'awaitingPayment',
    New = 'new',
    InProgress = 'inProgress',
    Finished = 'finished',
};

enum EditSteps {
    General = 0,
    Methodology = 1,
    Respondents = 2,
    Details = 3,
    Summary = 4,
};

enum RespondentsAges {
    Age18_25 = '18-25',
    Age26_32 = '26-32',
    Age33_39 = '33-39',
    Age40_46 = '40-46',
};

enum RespondentsInterests {
    automotive ='automotive',
    music = 'music',
    painting = 'painting',
    sports = 'sports',
};

enum Duration {
    m0_30 = '0-30',
    m30_60 = '30-60',
    m60_90 = '60-90',
    m90_120 = '90-120',
    m120_150 = '120-150',
    m150_180 = '150-180',
    m180_210 = '180-210',
    m210_240 = '210-240',
    m240_270 = '240-270',
};

enum PaymentCurrency {
    EUR = 'EUR',
};

enum Gender {
    Male = 'male',
    Female = 'female',
};

export {
    Methodology,
    Status,
    EditSteps,
    RespondentsAges,
    RespondentsInterests,
    Duration,
    PaymentCurrency,
    Gender,
};