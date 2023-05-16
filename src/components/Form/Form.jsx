import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { object, string, number, mixed } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { imageDimensionCheck } from '../../util/customYupValidation';

import Button from '../Button/Button';
import Input from '../Input/Input';
import Svg from '../svg/svg';
import Typography from '../Typography/Typography';
import RadioGroup from '../RadioGroup/RadioGroup';
import PhotoUpload from '../PhotoUpload/PhotoUpload';

import './Form.scss';

const schema = object({
  name: string()
    .required('Name is required!')
    .min(2, 'Minimum 2 letters!')
    .max(60, 'Maximum 60 letters!'),
  email: string()
    .required('Email is required!')
    .matches(
      /(^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$)/,
      'Email must be a valid address!'
    ),
  phone: string()
    .required('Phone is required!')
    .matches(
      /(^[\+]{1}38 [\()]0([0-9]{2})[\()] ([0-9]{3}) [\-)] ([0-9]{2}) [\-)] ([0-9]{2})$)/,
      '+38 (XXX) XXX - XX - XX'
    ),
  position_id: number().required('Select required!'),
  photo: mixed()
    .test('required', 'You need to provide a file!', value => {
      return value && value.length;
    })
    .test('fileSize', 'The file must be less than 5 mb!', value => {
      return value && value[0] && value[0].size <= 5000000;
    })
    .test('type', 'We only support jpeg and jpg!', function (value) {
      return (
        value &&
        value[0] &&
        (value[0].type === 'image/jpeg' || value[0].type === 'image/jpg')
      );
    })
    .imageDimensionCheck('test', 70, 70),
});

function Form({ id }) {
  const form = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting, isSubmitSuccessful },
  } = form;

  const onSubmit = data => {
    const formatPhone = phone => phone.replace(/[^+0-9]/g, '');

    const formattedData = {
      ...data,
      photo: data.photo[0],
      phone: formatPhone(data.phone),
    };

    console.log('Form submitted', formattedData);
  };

  if (isSubmitSuccessful) {
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

      <FormProvider {...form}>
        <form
          id={id}
          className='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Input type='text' id='name' name='name' label='Your name' />
          <Input type='email' id='email' name='email' label='Email' />
          <Input
            type='tel'
            id='phone'
            name='phone'
            label='Phone'
            helperText='+38 (XXX) XXX - XX - XX'
          />
          <RadioGroup id='positionChoice' name='position_id' />
          <PhotoUpload
            id='photo'
            name='photo'
            label='Upload'
            helperText='Upload your photo'
          />
        </form>
      </FormProvider>

      <Button
        type='submit'
        form={id}
        disabled={!isDirty || !isValid || isSubmitting}
      >
        Sign Up
      </Button>
    </>
  );
}

export default Form;
