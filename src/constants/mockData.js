export const mockProjects = [
  {
    id: '1',
    name: 'Website Redesign',
    owner: 'John Doe',
    status: 'Active',
    description: 'Full redesign of the company website with modern UI and improved performance.',
    progress: 65,
    createdAt: 'Jan 15, 2022',
  },
  {
    id: '2',
    name: 'Mobile App Launch',
    owner: 'Jane Smith',
    status: 'Active',
    description: 'Launch the new mobile app for iOS and Android platforms.',
    progress: 40,
    createdAt: 'Feb 10, 2022',
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    owner: 'Mike Johnson',
    status: 'Completed',
    description: 'Q1 digital marketing campaign across all channels.',
    progress: 100,
    createdAt: 'Mar 1, 2022',
  },
  {
    id: '4',
    name: 'Data Analysis',
    owner: 'Sarah Lee',
    status: 'Completed',
    description: 'Analyze user data and generate insights report for Q1.',
    progress: 100,
    createdAt: 'Apr 2, 2022',
  },
  {
    id: '5',
    name: 'Backend Refactor',
    owner: 'Ali Hassan',
    status: 'Active',
    description: 'Refactor legacy backend services to microservices architecture.',
    progress: 20,
    createdAt: 'May 5, 2022',
  },
];

export const mockTasks = {
  '1': [
    { id: 't1', title: 'Design Homepage', assignee: 'Jane Smith', priority: 'Medium', completed: true },
    { id: 't2', title: 'Develop Navigation', assignee: 'Mike Johnson', priority: 'High', completed: true },
    { id: 't3', title: 'Content Writing', assignee: 'Sarah Lee', priority: 'Low', completed: false },
    { id: 't4', title: 'QA Testing', assignee: 'John Doe', priority: 'High', completed: false },
  ],
  '2': [
    { id: 't5', title: 'Setup CI/CD', assignee: 'Ali Hassan', priority: 'High', completed: true },
    { id: 't6', title: 'Build Auth Flow', assignee: 'Jane Smith', priority: 'High', completed: false },
    { id: 't7', title: 'Push Notifications', assignee: 'John Doe', priority: 'Medium', completed: false },
  ],
  '3': [
    { id: 't8', title: 'Social Media Posts', assignee: 'Sarah Lee', priority: 'Low', completed: true },
    { id: 't9', title: 'Email Campaign', assignee: 'Mike Johnson', priority: 'Medium', completed: true },
  ],
  '4': [
    { id: 't10', title: 'Data Collection', assignee: 'Sarah Lee', priority: 'High', completed: true },
    { id: 't11', title: 'Generate Report', assignee: 'John Doe', priority: 'Medium', completed: true },
  ],
  '5': [
    { id: 't12', title: 'Audit Codebase', assignee: 'Ali Hassan', priority: 'High', completed: true },
    { id: 't13', title: 'Setup Services', assignee: 'Jane Smith', priority: 'High', completed: false },
    { id: 't14', title: 'Write Tests', assignee: 'Mike Johnson', priority: 'Medium', completed: false },
  ],
};
