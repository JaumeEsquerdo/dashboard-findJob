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
    posted_at: string
    description: string
    url: string
}

export type Seniority = "Junior" | "Mid-level" | "Senior"
