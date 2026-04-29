import { toast } from 'sonner';

export const InfoSuccess = (title: string, message: string) => {
  toast.success(title, {
    description: message,
    style: {
      background: '#002b16',
      color: '#ffffff',
      borderColor: '#10b981'
    },
  });
};