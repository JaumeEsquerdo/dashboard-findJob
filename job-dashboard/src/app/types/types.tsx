export type Job = {
    id: string
    title: string
    company: string
    location: string
    remote: boolean
    employment_type: string
    experience_level: string
    salary_min: number
    salary_max: number
    currency: string
    tags: string[]
    posted_at: Date
    description: string
    url: string
}

export type Seniority = "Intern" | "Junior" | "Mid" | "Senior"


export type Filters = {
    search: string
    experience: string
    location: string
    remote: boolean | null
}