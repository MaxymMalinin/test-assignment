import { mixed, addMethod } from 'yup';

const imageWidthAndHeight = provideFile => {
  const imgDimensions = { width: null, height: null };

  return new Promise(resolve => {
    const reader = new FileReader();

    reader.readAsDataURL(provideFile);
    reader.onload = function () {
      const img = new Image();
      img.src = reader.result;

      img.onload = function () {
        imgDimensions.width = img.width;
        imgDimensions.height = img.height;

        resolve(imgDimensions);
      };
    };
  });
};

const imageDimensionCheck = addMethod(
  mixed,
  'imageDimensionCheck',
  function (message, requiredWidth, requiredHeight) {
    return this.test(
      'image-minWidth-minHeight-check',
      message,
      async function (value) {
        const { path, createError } = this;

        if (!value[0]) {
          return;
        }

        const imgDimensions = await imageWidthAndHeight(value[0]);

        if (
          imgDimensions.width < requiredWidth ||
          imgDimensions.height < requiredHeight
        ) {
          return createError({
            path,
            message: `Photo resolution must be at least ${requiredWidth} x ${requiredHeight} px!`,
          });
        }

        return true;
      }
    );
  }
);

export { imageDimensionCheck };
