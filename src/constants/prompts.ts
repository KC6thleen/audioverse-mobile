export interface Prompt {
  name: string
  renew: number
  executed: number
  confirmed: boolean
}

const data: Prompt[] = [
  {
    name: 'donate',
    renew: 15768000000, // millisecs (6 months)
    executed: 0,
    confirmed: false
  },
  {
    name: 'leave_review',
    renew: 0,
    executed: 0,
    confirmed: false
  },
  {
    name: 'share',
    renew: 86400000, // millisecs (1 day)
    executed: 0,
    confirmed: false
  },
]

export default data
