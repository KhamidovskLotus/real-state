import { avatarColors } from 'contains/contants';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'states/store';

export interface AvatarProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  imgUrl?: string;
  userName?: string;
  hasChecked?: boolean;
  hasCheckedClass?: string;
}

export const DEFAULT_IMAGE = `https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg`
const Avatar: FC<AvatarProps> = ({
  containerClassName = 'ring-1 ring-white dark:ring-neutral-900',
  sizeClass = 'h-6 w-6 text-sm',
  radius = 'rounded-full',
  imgUrl,
  userName,
  hasChecked,
  hasCheckedClass = 'w-4 h-4 -top-0.5 -right-0.5',
}) => {
  const user = useSelector((store: StoreState) => store.user.current);
  if (user && user.user_profile && !imgUrl) {
    imgUrl = user.user_profile;
  }
  if(!imgUrl) { 
    imgUrl = DEFAULT_IMAGE;
  }
  const url = imgUrl || '';
  const name = userName || 'John Doe';
  const _setBgColor = (name: string) => {
    const backgroundIndex = Math.floor(
      name.charCodeAt(0) % avatarColors.length
    );
    return avatarColors[backgroundIndex];
  };

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
      style={{ backgroundColor: url ? undefined : _setBgColor(name) }}
    >
      {url && (
        <img
          className={`absolute inset-0 w-full h-full object-cover ${radius}`}
          src={url}
          alt={name}
        />
      )}
      <span className="wil-avatar__name">{name[0]}</span>

      {hasChecked && (
        <span
          className={` bg-teal-500 rounded-full text-white text-xs flex items-center justify-center absolute  ${hasCheckedClass}`}
        >
          <i className="las la-check"></i>
        </span>
      )}
    </div>
  );
};

export default Avatar;
