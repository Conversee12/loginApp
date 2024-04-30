import * as React from 'react';

import {cn} from '../../lib/utils';
import {IonIcon} from '@ionic/react';
import {eyeOffOutline} from 'ionicons/icons';
import {eyeOutline} from 'ionicons/icons';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, ...props}, ref) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    return (
      <div className="relative flex items-center">
        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          className={cn(
            'flex h-10 w-full rounded-[8px] border border-input bg-background px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-[#C2C3C4]',
            className,
          )}
          ref={ref}
          {...props}
        />
        {showPassword
          ? type === 'password' && (
              <IonIcon
                className="absolute right-[16px] w-[24px] h-[24px] cursor-pointer"
                onClick={() => setShowPassword(false)}
                icon={eyeOutline}
                onClickCapture={() => setShowPassword(false)}
              />
            )
          : type === 'password' && (
              <IonIcon
                className="absolute right-[16px] w-[24px] h-[24px] cursor-pointer"
                onClick={() => setShowPassword(true)}
                icon={eyeOffOutline}
              />
            )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export {Input};
