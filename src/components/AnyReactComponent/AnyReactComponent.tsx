import { Transition } from '@headlessui/react';
import { HomeIcon } from '@heroicons/react/24/outline';
import { Data } from '@react-google-maps/api';
import CarCard from 'components/CarCard/CarCard';
import ExperiencesCard from 'components/ExperiencesCard/ExperiencesCard';
import PropertyCard from 'components/PropertyCard/PropertyCard';
import { CarDataType, ExperiencesDataType } from 'data/types';
import { property } from 'lodash';
import { HiBuildingOffice, HiOutlineComputerDesktop } from 'react-icons/hi2'
import {PiBuildingApartmentFill, PiOfficeChairDuotone } from 'react-icons/pi'
import React, { FC, Fragment, useEffect, useState } from 'react';
import { IoHome } from 'react-icons/io5';
import { Property, PropertyAvailability } from 'types/property';
import { FaComputer } from 'react-icons/fa6'

export interface AnyReactComponentProps {
  className?: string;
  listing?: Property;
  experiences?: ExperiencesDataType;
  car?: CarDataType;
  isSelected?: boolean;
  lat: number;
  lng: number;
  isShow2Change?: boolean;
  onChangeAvailability?: (availability: PropertyAvailability) => void;
}

const AnyReactComponent: FC<AnyReactComponentProps> = ({
  className = '',
  listing,
  car,
  experiences,
  isSelected,
  onChangeAvailability,
  isShow2Change  = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const getColor = () => {
    if(!isShow2Change){
      return 'bg-green-500';
    }
    if (listing?.property_availability === 'Rented') {
      return 'bg-green-500';
    }
    if (listing?.property_availability === 'Not for rent') {
      return 'bg-yellow-500';
    }
    return 'bg-red-500';
  };
  const getIcon = () => {
    const className = 'size-6'
    if(listing?.property_type === 'House'){
      return <IoHome className={className} />
    }
    if(listing?.property_type === 'Office'){
      return <FaComputer    className={className} />
    }
    if(listing?.property_type === 'Apartment'){
      return <PiBuildingApartmentFill  className={className} />
    }
  }
  const getIconContainerClass = (): string => {
    if (listing?.property_availability === 'Rented') {
      return 'border-yellow-800';
    }
    if (listing?.property_availability === 'Not for rent') {
      return 'border-red-800';
    }
    return 'border-green-800';
  }

  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const parentDiv = e.currentTarget.parentElement;
    if (parentDiv) {
      const parentSiblings = parentDiv.parentElement?.children;
      if (parentSiblings) {
        Array.from(parentSiblings).forEach((sibling: any) => {
          sibling.style.zIndex = '0';
        });
      }
      parentDiv.style.zIndex = '10';
    }
    setIsOpen(!isOpen);
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (  
    <div
      className={`nc-AnyReactComponent relative  ${className}`}
      data-nc-id="AnyReactComponent"
      onClick={handleToggle}
    >
      <span
        className={`border flex p-1.5 rounded-r-full rounded-bl-full ${getColor()} text-sm font-semibold items-center justify-center text-white min-w-max shadow-lg hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors ${
          isSelected
            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
            : ''
        }`}
      
      onClick={handleClose}>
        {getIcon()}
        {/* <IoHome className='size-6' /> */}
        {/* {listing?.property_type || experiences?.price || car?.price} */}
      </span>
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute bottom-full pb-3 -left-12 w-[260px] aspect-w-1">
          {listing && (
            <PropertyCard 
            isShow2Change={isShow2Change}
            onChangeAvailability={onChangeAvailability}
            size="small"
            data={listing} 
            className="shadow-2xl"
            handleToggle={handleToggle}
            isOpen={isOpen}
            />
          )}
        </div>
      </Transition>
    </div>
  );
};



export default AnyReactComponent;
