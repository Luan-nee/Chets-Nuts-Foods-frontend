import { User } from 'lucide-react';

interface UserInfoProps {
  nombreUser: string;
  rol: string;
}

export default function UserInfo({ nombreUser, rol }: UserInfoProps) {
  return (
    <div className="w-full flex gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 bg-gray-800">
      <div className="flex items-center justify-center bg-gray-700 rounded-lg">
        <User className="w-5 h-5" />
      </div>
      <div className="text-left w-full">
        <p className="text-xs text-white font-bold">{nombreUser}</p>
        <p className="text-xs text-gray-400">{rol}</p>
      </div>
    </div>
  );
}