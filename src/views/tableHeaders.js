export const report_statement = [
    { key: "order" },
    { key: "userName" },
    { key: "created_at" },
    { key: "current_credit" },
    { key: "win_lose" },
    { key: "deposit" },
    { key: "withdraw" },
    { key: "company" },
    { key: "agent" },
    { key: "agent_account" },
    { key: "member_account" }
]
export const user_report = [
    { key: "userName" },
    { key: "created_at" },
    { key: "updated_at" },
    { key: "firstName" },
    { key: "lastName" },
    { key: "phone" },
    { key: "socail" },
    { key: "userLevel" },
    { key: "accNum" },
    { key: "lineID" },
    { key: "bank" },
    { key: "additional" }
]
export const winlose = [
    { key: "userName" },
    { key: "order" },
    { key: "timestamp" },
    { key: "current_credit" },
    { key: "win_lose" },
    { key: "deposit" },
    { key: "withdraw" },
    { key: "company" },
    { key: "agent" },
    { key: "agent_account" },
    { key: "member_account" }
]
export const deposit = [
    { key: "order" },
    { key: "userName" },
    { key: "amount_money" },
    { key: "status" },
    { key: "promotion" },
    { key: "bonus" },
    { key: "maximum_withdrawal" },
    { key: "balance_before" },
    { key: "balance_after" },
    { key: "source" },
    { key: "transfer_to" },
    { key: "created_at" },
]
export const withdraw = [
    { key: "order" },
    { key: "userName" },
    { key: "amount_money" },
    { key: "status" },
    { key: "maximum_withdrawal" },
    { key: "credit_before" },
    { key: "credit_after" },
    { key: "balance_before" },
    { key: "balance_after" },
    { key: "bonus" },
    { key: "account_number" },
    { key: "made_by" },
    { key: "account" },
    { key: "note" },
    { key: "withdrawal_date" },
]

export const staffList = [
    { key: "order" },
    { key: "option" },
    { key: "login" },
    { key: "firstName" },
    { key: "lastName" },
    { key: "userName" },
    { key: "status" },
    { key: "created_at" },
]

export const adminActivity = [
    { key: "order" },
    { key: "type" },
    { key: "userName" },
    { key: "amount" },
    { key: "note" },
    { key: "created_at" },
]
export const buttons = [
    { name: "all", value: -1 },
    { name: "today", value: 0 },
    { name: "yesterday", value: 1 },
    { name: "week", value: 7 },
    { name: "month", value: 30 },
    { name: "year", value: 365 },
]

export const customer = [
    { key: "order" },
    { key: "userName" },
    { key: "member" },
    { key: "firstName" },
    { key: "lastName" },
    { key: "userLevel" },
    { key: "created_at" },
    { key: "option" },
]

export const gameList = [
    { key: 'order' },
    { key: 'image' },
    { key: 'game_name' },
    { key: 'category' },
    { key: 'provider' },
    { key: 'win_lose' },
    { key: 'start_time' },
    { key: 'end_time' },
]

export const gameReports = [
    { key: 'provider' },
    { key: 'category' },
    { key: 'turn' },
    { key: 'win_lose' },
]

export const creditReports = [
    { key: 'provider' },
    { key: 'submit' },
    { key: 'remain' },
]