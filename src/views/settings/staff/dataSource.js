export const dataSource = [
    { id: 1, name: 'Select All', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: "Various", hasChild: true, expanded: true },
    { id: 3, pid: 2, name: "View transaction history of moderators", isChecked: false },
    { id: 4, pid: 1, name: "Report", hasChild: true },
    { id: 5, pid: 4, name: "Profit or loss" },
    { id: 6, pid: 4, name: "Withdraw money" },
    { id: 7, pid: 4, name: "Deposit money" },
    { id: 8, pid: 4, name: "Move money" },
    { id: 9, pid: 4, name: "Affiliate Report" },
    { id: 10, pid: 4, name: "Money transfer report" },
    { id: 11, pid: 4, name: "Promotion summary report" },
    { id: 12, pid: 1, name: "System settings", hasChild: true },
    { id: 13, pid: 12, name: "True wallet" },
    { id: 14, pid: 12, name: "Bank deposit / withdraw" },
    { id: 15, pid: 12, name: "Management system" },
    { id: 16, pid: 12, name: "Alert" },
    { id: 17, pid: 12, name: "Recommend a friend" },
    { id: 18, pid: 12, name: "Promotion" },
    { id: 19, pid: 1, name: "Finance", hasChild: true },
    { id: 20, pid: 19, name: "Check user balance" },
    { id: 21, pid: 19, name: "Check user credit" },
    { id: 22, pid: 19, name: "Credit check agencies" },
    { id: 23, pid: 19, name: "Credit discount" },
    { id: 24, pid: 19, name: "Approve withdrawal" },
    { id: 25, pid: 19, name: "Increase credit" },
    { id: 26, pid: 1, name: "Manage members", hasChild: true },
    { id: 27, pid: 26, name: "Manage members (see list)" },
    { id: 28, pid: 26, name: "Add members" },
    { id: 29, pid: 26, name: "Edit member" }
];

export const componentsArray = [
    {
        "name": "Dashboard",
        "value": "edit"
    },
    {
        "name": "Add_members",
        "value": "edit"
    },
    {
        "name": "Manage_members",
        "value": "edit"
    },
    {
        "name": "System_Setting",
        "value": "edit"
    },
    {
        "name": "deposit_withdraw_money",
        "value": "edit"
    },
    {
        "name": "Deposit_Withdraw_Transfer",
        "value": "edit"
    },
    {
        "name": "Summary_Report",
        "value": "edit"
    },
    {
        "name": "Affiliate_Report",
        "value": "edit"
    },
    {
        "name": "Money_transfer_report",
        "value": "edit"
    }
]