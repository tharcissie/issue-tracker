import { ShareService } from 'src/app/core/share/share.service';

const data = new ShareService();

export const cardData = [
  {
    icon: 'fa fa-users fa-2x iconColor',
    label: 'Users',
    number: data.userNumber?.toString(),
  },
  {
    icon: 'fa fa-file fa-2x iconColor',
    label: 'Projects',
    number: data.projectNumber?.toString(),
  },
  {
    icon: 'fa fa-bug  fa-2x iconColor',
    label: 'Issues',
    number: data.issueNumber?.toString(),
  },
];
