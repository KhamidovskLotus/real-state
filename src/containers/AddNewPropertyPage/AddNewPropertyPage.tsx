import { getAgent } from 'api/agent';
import api from 'api/api';
import endpoints from 'api/endpoint';
import { getPropertyById, PROPERTY_DUMMY_PHOTO_URL } from 'api/property';
import axios from 'axios';
import FileInput from 'components/FileInput/FileInput';
import { AMENITIES_LIST, PRIORITY_AMENITIES_LIST } from 'data/amenities';
import { PROPERTY_AVAILABILITY, PROPERTY_FOR, PROPERTY_TYPE } from 'data/property';
import { UZBEKISTAN_CITIES, UZBEKISTAN_STATE } from 'data/uzbekistan';
import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { RxCross1 } from 'react-icons/rx';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import GoogleMapChooser from 'shared/GoogleMapChooser/GoogleMapChooser';
import Input from 'shared/Input/Input';
import Modal from 'shared/Modal/Modal';
import MultiSelect from 'shared/MutliSelect/MultiSelect';
import NcImage from 'shared/NcImage/NcImage';
import Select2 from 'shared/Select2/Select2';
import Textarea from 'shared/Textarea/Textarea';
import { StoreState } from 'states/store';
import { ChildrenOnly } from 'types/children';
import { PaginationResult } from 'types/pagination';
import { AddPropertyPayload } from 'types/payload/add-property';
import { Property, PropertyImage } from 'types/property';
import { SelectOption } from 'types/selectOption';
import { getImageId, objectToFormData } from 'utils/objectUtil';
import { stringToSelectOption } from 'utils/selectUtil';
import { toastError, toastSuccess } from 'utils/toast';

export interface AddNewPropertyPageProps {
  className?: string;
}

const examplePayload: AddPropertyPayload = {
  remove_agent: false,
  client_id: 0,
  property_address: '',
  bathrooms: 0,
  agent_assigned_id: '',
  country: '',
  upload_images: [],
  state: '',
  city: '',
  latitude: '',
  longitude: '',
  description: '',
  amenities: '',
  property_type: '',
  price: 0,
  bedrooms: 0,
  area_sqft: 0,
  built_year: '0',
  property_title: '',
  property_availability: '',
  property_for: ''
};

const AddNewPropertyPage: FC<AddNewPropertyPageProps> = ({
  className = '',
}) => {
  const [location, setLocation] = useState<string>('');
  const { id } = useParams();
  const { data: agentPagination } = useQuery<PaginationResult<Agent> | null, Error>('agent', () => getAgent({}));
  const agents = agentPagination ? agentPagination.results : [];
  const [existedProperty, setExistedProperty] = useState<Property | null>(null);
  const [deletedFiles, setDeletedFiles] = useState<PropertyImage[]>([]);
  const [files, setFiles] = useState<Array<File | string | PropertyImage>>([]);
  const { register, handleSubmit, setValue, getValues, formState: {errors} } =
    useForm<AddPropertyPayload>({
      defaultValues: {
        property_availability: PROPERTY_AVAILABILITY[0],
        country: 'Uzbekistan',
        state: UZBEKISTAN_STATE[0],
        city: UZBEKISTAN_CITIES[0],
        property_type: PROPERTY_TYPE[0],
        property_for: PROPERTY_FOR[0].toLowerCase()
      },
    });

  async function checkPropertyExist() {
    if (id) {
      const property = await getPropertyById(id);
      if (property) {
        setExistedProperty(property);
        setFiles(property.images.filter((image) => image.image !== PROPERTY_DUMMY_PHOTO_URL).map((image) => image));
        if(property['property_address']){
        setLocation(property['property_address'])
        }
        for (const key of Object.keys(examplePayload)) {
          // @ts-ignore
          if (property[key]) {
            // @ts-ignore
            setValue(key, property[key]);
          }
        }
      }
    }
  }
  useEffect(() => {
    checkPropertyExist();
  }, [id]);
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useSelector((store: StoreState) => store.user)
  const { mutate, isLoading } = useMutation<any, Error, AddPropertyPayload>({
    mutationFn: async (payload: AddPropertyPayload) => {
      if (payload.built_year && !/^\d+$/.test(payload.built_year)  ) {
        delete payload.built_year;
      }
      payload.upload_images = payload.upload_images.filter(
        (file) => file instanceof File
      );
      if(user.current?.role === 'agent'){
        payload.agent_assigned_id = user.current!.id!.toString();
      } else {
          payload.client_id = user.current!.id!;
        }
      if(!payload.agent_assigned_id){
        // @ts-ignore
        delete payload.agent_assigned_id;
        payload.remove_agent = true;
      } 
      if (existedProperty) {
        const result = await api.mutateBackend(
          endpoints.property.update,
          objectToFormData(payload),
          existedProperty.property_id.toString()
        );
        for (const deletedFile of deletedFiles) {
          const ax = api.getAxios();
          await ax.delete(
            `${
              process.env.REACT_APP_API_URL
            }/property/${id}/images/${getImageId(deletedFile.uuid)}/`,
            api.getConfig()
          );
        }
        return result;
      } else {
        return await api.mutateBackend(
          endpoints.property.add,
          objectToFormData(payload)
        );
      }
    },
    onSuccess: (response) => {
      if (response) {
        toastSuccess(
          `Succesfully ${existedProperty ? 'update' : 'add'} new property!`
        );
        navigate('/my-property')
        // window.location.href = '/my-property';
      }
    },
  });
  const onSubmit = async (e: AddPropertyPayload) => {
    await mutate(e);
  };
  const propertyForOptions = stringToSelectOption(PROPERTY_FOR);
  const propertyTypeOptions = stringToSelectOption(PROPERTY_TYPE);
  const amenitiesOptions = AMENITIES_LIST.map((amenities) =>  {
    const isPriority = PRIORITY_AMENITIES_LIST.includes(amenities);
    if(isPriority){
      return {label: amenities + ' 🌟', value: amenities}
    }
    return {label: amenities, value: amenities}
  })
  const agentOptions = agents
    ? agents.map(
        (agent): SelectOption => ({
          label: agent.username,
          value: agent.id.toString(),
        })
      )
    : [];
  // if(existedProperty && agentOptions.length > 0) {
  agentOptions.unshift({label: 'No agents', value: ''})
  // }
  let defaultAmenities: SelectOption[] = [];
  existedProperty?.amenities.split(',').forEach((amenities) => {
    const findedAmenitiesOption = amenitiesOptions.find(
      (amenitiesOption) => amenitiesOption.value === amenities
    );
    if (findedAmenitiesOption) {
      defaultAmenities.push(findedAmenitiesOption);
    }
  });

  useEffect(() => {
    setValue('upload_images', files);
  }, [files]);

  return (
    <div
      className={`nc-AddNewPropertyPage ${className}`}
      data-nc-id="AddNewPropertyPage"
    >
      <Modal open={openMapModal} setOpen={setOpenMapModal}>
        <GoogleMapChooser
          onSave={(e, result) => {
            const addressComponents = result.address_components;
            let city = '';
            let state = '';
            for (const component of addressComponents) {
              if (component.types.includes('locality')) {
                city = component.long_name;
              }
              if (component.types.includes('administrative_area_level_1')) {
                state = component.short_name; 
              }
            }
            setValue('city', city)
            setValue('state', state)
            const formattedAddress = result.formatted_address.split(' ').filter((v: string) => !v.includes('+')).join(' ');
            setValue('property_address', formattedAddress)
            setLocation(formattedAddress);
            setOpenMapModal(false)
            setValue('latitude', e.lat.toString().substring(0, 9));
            setValue('longitude', e.lng.toString().substring(0, 9));
          }}
        />
      </Modal>
      <div className="container mb-24 lg:mb-32">
        <div className="mt-20 max-w-3xl mx-auto space-y-6">
          <form
            onSubmit={handleSubmit((e) => onSubmit(e))}
            className="grid grid-cols-1 gap-6"
          >
            <h2 className="mb-4 flex text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100">
              {existedProperty ? 'Update ' : 'Add New '} Property
            </h2>
            <Headline>Tell me about your property 👋</Headline>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Title
              </span>
              <Input
              errors={errors}
                placeholder="Good Property"
                {...register('property_title', {
                  required: 'Title is required to create property!',
                })}
                type="text"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Property Type
              </span>
              <Select2
                defaultValue={propertyTypeOptions.find(
                  (propertyType) =>
                    propertyType.value === existedProperty?.property_type
                )}
                onChange={(e) => setValue('property_type', e.value)}
                className="mt-1"
                isFirstDefault={true}
                options={propertyTypeOptions}
              ></Select2>
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Description
              </span>
              <Textarea
                {...register('description', {
                  required: 'Description is required to create property!',
                })}
                placeholder="Only 5 minutes to near station ..."
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Property For
              </span>
              <Select2
                defaultValue={propertyForOptions.find(
                  (property) => property.value === existedProperty?.property_for
                )}
                placeholder="Property For"
                onChange={(e) => setValue('property_for', e.value.toLowerCase())}
                className="mt-1"
                isFirstDefault={true}
                options={propertyForOptions}
              ></Select2>
            </label>
            <Separator />
            <Headline>
              Is there any special features that you want to tell us ? 🌟
            </Headline>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Aminities
              </span>
              <MultiSelect
                defaultValue={defaultAmenities}
                onChange={(e) =>
                  setValue('amenities', e.map((v) => v.value).join(','))
                }
                className="mt-1"
                options={amenitiesOptions}
              ></MultiSelect>
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Bedrooms
              </span>
              <Input
              errors={errors}

                placeholder="2"
                {...register('bedrooms', {
                  required: 'Bedroom is required to create property!',
                })}
                type="number"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Bathroom
              </span>
              <Input
              errors={errors}

                placeholder="2"
                {...register('bathrooms', {
                  required: 'Bathroom is required to create property!',
                })}
                type="number"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Area Square Meter
              </span>
              <Input
                placeholder="2000 sqm"
                {...register('area_sqft', {
                  required: 'Area Square Meter is required to create property!',
                })}
                type="number"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Build Year
              </span>
              <Input
              errors={errors}

                placeholder="2024"
                {...register('built_year', {
                  required: 'Build Year is required to create property!',
                })}
                className="mt-1"
              />
              <div className="text-xs pl-2 pt-1 text-neutral-500 dark:text-neutral-400">* Type 'X' if you are not sure</div>
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Price
              </span>
              <Input
              errors={errors}

                placeholder="$500"
                {...register('price', {
                  required: 'Price is required to create property!',
                })}
                type="number"
                className="mt-1"
              />
            </label>

            <Separator />
            <Headline>
              Please share the property image for the audience 📸
            </Headline>

            <div className="block">
              <span className="mb-1 flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Property Image
              </span>
              <FileInput
                onChange={(e) => {
                  // let fileSize = 0
                  // for(const file of newArray){
                  //   if (file instanceof File && file.size) {
                  //     fileSize += file.size;
                  //   }
                  // }
                  // if (fileSize > 4 * 1024 * 1024) {
                  //   toastError('All file size must be less than 4MB');
                  //   return;
                  // }
                  setFiles([...e, ...files]);
                }}
              />
              <div className="flex mt-4  gap-5 relative flex-wrap">
                {files.map((preview:any, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-md h-[111px] w-[148px]"
                  >
                    <div
                      onClick={() => {
                        if (
                          existedProperty &&
                          typeof preview !== 'string' &&
                          preview instanceof File === false
                        ) {
                          // @ts-ignore
                          setDeletedFiles((prev) => [...prev, preview]);
                        }
                        setFiles((prev) => prev.filter((_, i) => i !== index));
                      }}
                      className="absolute top-1 right-1 p-2 cursor-pointer rounded-full transition-all hover:bg-opacity-25 hover:bg-neutral-800"
                    >
                      <RxCross1 className="size-4 text-neutral-200" />
                    </div>
                    
                    <NcImage
                      className="rounded-md overflow-hidden object-cover "
                      src={
                         typeof preview === 'object' ? URL.createObjectURL(preview) :preview
                      }
                      alt={`Preview Images`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <Headline>Where is this property located ? 🌆</Headline>

            {/* <div className="flex gap-6">
              <label className="block w-full">
                <span className="text-neutral-800 dark:text-neutral-200">
                  City
                </span>
                <Select2
                  defaultValue={uzbekistanCityOptions.find(
                    (city) => city.value === existedProperty?.city
                  )}
                  className="mt-1"
                  isFirstDefault={true}
                  onChange={(e) => setValue('city', e.value)}
                  options={uzbekistanCityOptions}
                ></Select2>
              </label>
              <label className="block w-full">
                <span className="text-neutral-800 dark:text-neutral-200">
                  State
                </span>
                <Select2
                  defaultValue={uzbekistanStateOptions.find(
                    (state) => state.value === existedProperty?.state
                  )}
                  onChange={(e) => setValue('state', e.value)}
                  className="mt-1"
                  isFirstDefault={true}
                  options={uzbekistanStateOptions}
                ></Select2>
              </label>
            </div> */}
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Pin Location
              </span>
              <Input
              errors={errors}
                value={location}
                onClick={() => setOpenMapModal(true)}
                placeholder="Click here to shows your property location!"
              ></Input>
              {getValues('latitude') && getValues('longitude') && (
                <div className="text-sm text-green-400 ml-1 mt-1">
                  Succesfully get your location
                </div>
              )}
            </label>
            {/* <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Full Address
              </span>
              <Textarea
                placeholder="Give your address detail here"
                {...register('property_title', {
                  required: 'Title is required to create property!',
                })}
                className="mt-1"
              />
            </label> */}
              {user.current?.role === 'client' &&
              <>
              <Separator />
            <Headline>
              Are you already having agent for this property ? 🧑‍🦰
            </Headline>
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Assigned Agent
                  </span>
                  <Select2
                  defaultValue={agentOptions.find(
                        (agent) => {
                          if(!existedProperty || !existedProperty.agent_assigned || typeof existedProperty.agent_assigned === 'string'){
                            return false;
                          }
                          return agent.value === existedProperty.agent_assigned.id.toString()
                        }
                      )}
                      placeholder="Select Agent..."
                      onChange={(e) => {
                        setValue('agent_assigned_id', e.value)
                      }}
                      className="mt-1"
                      isFirstDefault={false}
                    options={agentOptions}
                  ></Select2>
                </label>
                          </>
            }
            <ButtonPrimary className="mt-12" loading={isLoading} type="submit">
              {existedProperty ? 'Update' : 'Add New'} Property
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewPropertyPage;

function Separator() {
  return <hr className="w-full h-[0.2px] bg-stone-200  my-20 " />;
}

function Headline({ children }: ChildrenOnly) {
  return <h3 className="text-xl my-2">{children}</h3>;
}
