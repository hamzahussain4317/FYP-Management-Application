import {z} from 'zod';
export const createProposalSchema=z.object({
    projectName:z.string().min(1,"ProjectName should be greater than one character"),
    projectDomain:z.string().min(1,"ProjectDomain should be greater than one character"),
    projectDescription:z.string().min(1,"give some short details of your project"),
    groupName:z.string().min(1,"project Name should be greater than one character"),
    // proposlFile:z.
})