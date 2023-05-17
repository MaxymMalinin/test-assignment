import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string, number, mixed } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { imageDimensionCheck } from '../../util/customYupValidation';
import { postForm } from '../../services/testAssignmentApi';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Svg from '../svg/svg';
import Typography from '../Typography/Typography';
import RadioGroup from '../RadioGroup/RadioGroup';
import PhotoUpload from '../PhotoUpload/PhotoUpload';

import './Form.scss';

const schema = object({
  name: string()
    .required('Name is required')
    .min(2, 'Minimum 2 letters')
    .max(60, 'Maximum 60 letters'),
  email: string()
    .required('Email is required')
    .matches(
      /(^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$)/,
      'Email must be a valid address'
    ),
  phone: string()
    .required('Phone is required')
    .matches(
      /(^[\+]{1}38 [\()]0([0-9]{2})[\()] ([0-9]{3}) [\-)] ([0-9]{2}) [\-)] ([0-9]{2})$)/,
      '+38 (XXX) XXX - XX - XX'
    ),
  position_id: number().required('Select required!'),
  photo: mixed()
    .test('required', 'Photo is required', value => {
      return value && value.length;
    })
    .test('fileSize', 'The file must be less than 5 mb', value => {
      return value && value[0] && value[0].size <= 5000000;
    })
    .test('type', 'We only support jpeg and jpg', function (value) {
      return (
        value &&
        value[0] &&
        (value[0].type === 'image/jpeg' || value[0].type === 'image/jpg')
      );
    })
    .imageDimensionCheck('Dimension check error', 70, 70),
});

function Form({ id }) {
  const form = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = form;

  const [error, setError] = useState('');
  const [isSubmitSuccessfully, setIsSubmitSuccessfully] = useState(false);

  const onSubmit = data => {
    const formatPhone = phone => phone.replace(/[^+0-9]/g, '');

    const formattedData = {
      ...data,
      photo: data.photo[0],
      phone: formatPhone(data.phone),
    };

    postForm(formattedData)
      .catch(error => {
        const status = error.response.status;

        if (status === 401) {
          return setError(
            'Registration time has expired. Please reload the page and try again'
          );
        }

        if (status === 409) {
          return setError(error.response.data.message);
        }

        if (status === 422) {
          return setError('One or more fields are incorrectly filled');
        }

        return setError('An error occurred while submitting form. Try again');
      })
      .then(setIsSubmitSuccessfully(true));
  };

  if (isSubmitSuccessfully) {
    return (
      <>
        <Typography as='h2' design='heading'>
          User successfully registered
        </Typography>
        <Svg id='success-image' className='success-image' />
      </>
    );
  }

  return (
    <>
      <Typography as='h2' design='heading'>
        Working with POST request
      </Typography>

      <form
        id={id}
        className='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          type='text'
          id='name'
          name='name'
          label='Your name'
          register={register}
          errors={errors}
        />
        <Input
          type='email'
          id='email'
          name='email'
          label='Email'
          register={register}
          errors={errors}
        />
        <Input
          type='tel'
          id='phone'
          name='phone'
          label='Phone'
          helperText='+38 (XXX) XXX - XX - XX'
          register={register}
          errors={errors}
        />
        <RadioGroup
          id='positionChoice'
          name='position_id'
          register={register}
        />
        <PhotoUpload
          id='photo'
          name='photo'
          label='Upload'
          placeholder='Upload your photo'
          register={register}
          errors={errors}
        />
      </form>

      <Button
        type='submit'
        form={id}
        disabled={!isDirty || !isValid || isSubmitting}
      >
        Sign Up
      </Button>
      {error && <div className='form-error'>{error}</div>}
    </>
  );
}

export default Form;
