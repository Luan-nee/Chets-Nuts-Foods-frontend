import { toast } from 'sonner';

export const InfoError = (title: string, message: string) => {
  toast.error(title, {
    description: message,
    style: {
      background: '#3f0200',
      color: '#ffffff',
      borderColor: '#c50f0f'
    },
  });
};