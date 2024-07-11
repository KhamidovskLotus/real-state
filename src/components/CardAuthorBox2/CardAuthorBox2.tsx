import { ArrowRightIcon } from '@heroicons/react/24/solid';
import BtnLikeIcon from 'components/BtnLikeIcon/BtnLikeIcon';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar, { DEFAULT_IMAGE } from 'shared/Avatar/Avatar';
import NcImage from 'shared/NcImage/NcImage';
import { addAgentSaveList, removeAgentSaveList } from 'states/saveListSlice';
import { StoreState } from 'states/store';

export interface CardAuthorBox2Props {
  className?: string;
  data: Agent;
}

const CardAuthorBox2: FC<CardAuthorBox2Props> = ({ className = '', data }) => {
  const agentDatas = useSelector((store: StoreState) => store.saveList.agentDatas)
  const dispatch = useDispatch();
  return (
    <Link
      to={`/agent/${data.id}`}
      className={`nc-CardAuthorBox2 flex flex-col overflow-hidden bg-white dark:bg-neutral-900 rounded-3xl hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="CardAuthorBox2"
    >
      <div className="relative flex-shrink-0 ">
        <div>
          <NcImage
            containerClassName="flex aspect-w-7 aspect-h-3 md:aspect-h-4 w-full h-0"
            src={'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'}
          />
          <div onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }} className="absolute z-5 top-3 right-3">
            <BtnLikeIcon onChange={(e) => {
            if(e){
              dispatch(addAgentSaveList(data))
            } else {
              dispatch(removeAgentSaveList(data))
            }
            }} isLiked={agentDatas.has(data.id)}/>
          </div>
        </div>
        {/* <div className="absolute top-3 inset-x-3 flex">
          <div className="py-1 px-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center leading-none text-xs font-medium">
            {convertNumbThousand(count)}{' '}
            <ArrowRightIcon className="w-5 h-5 text-yellow-600 ml-3" />
          </div>
        </div> */}
      </div>
      <div className="pt-[1px] px-6 text-center flex flex-col items-center relative -translate-y-7">
        <svg
          className="h-12 text-white dark:text-neutral-900 dark:group-hover:text-neutral-800"
          viewBox="0 0 135 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M101.911 19.8581C99.4421 17.4194 97.15 14.8065 94.6816 12.1935C94.3289 11.671 93.8 11.3226 93.271 10.8C92.9184 10.4516 92.7421 10.2774 92.3895 9.92903C85.8658 3.83226 76.8737 0 67.1763 0C57.4789 0 48.4868 3.83226 41.7868 9.92903C41.4342 10.2774 41.2579 10.4516 40.9053 10.8C40.3763 11.3226 40.0237 11.671 39.4947 12.1935C37.0263 14.8065 34.7342 17.4194 32.2658 19.8581C23.45 28.7419 11.6368 30.4839 0 30.8323V54H16.5737H32.2658H101.734H110.374H134.176V30.6581C122.539 30.3097 110.726 28.7419 101.911 19.8581Z"
            fill="currentColor"
          />
        </svg>
        <span className="absolute top-2">
          <Avatar
            containerClassName=""
            sizeClass="w-12 h-12 text-2xl"
            radius="rounded-full"
            imgUrl={data.user_profile ? data.user_profile : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
            userName={data.username}
          />
        </span>
        <div className="mt-6 leading-none">
          <div className={`text-base font-medium`}>
            <span className="line-clamp-1">{data.username}</span>
          </div>
          <div
            className={`flex flex-col gap-0.5 text-sm text-neutral-500 dark:text-neutral-400`}
          >
            <span className='text-neutral-600 text-md'>{data.city}</span>
            <span className=''>
              {data.languages && data.languages.split(',').join(' · ')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardAuthorBox2;
