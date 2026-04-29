import { toast } from 'sonner';

export const InfoWarning = (title: string, message: string) => {
  toast.warning(title, {
    description: message,
    style: {
      background: '#ff0000',
      color: '#ffffff',
      borderColor: '#f59e0b'
    },
  });
};