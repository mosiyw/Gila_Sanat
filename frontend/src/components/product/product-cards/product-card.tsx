import React, { useState } from 'react';
import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import PlusIcon from '@components/icons/plus-icon';
import { useCart } from '@contexts/cart/cart.context';
// import { AddToCart } from '@components/product/add-to-cart';
import { useTranslation } from 'next-i18next';
import { productPlaceholder } from '@assets/placeholders';
import defaultImage from '@assets/placeholders/product-placeholder.png';
import dynamic from 'next/dynamic';
import toman from '@assets/toman.svg';
import { useEffect } from 'react';
const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ data }: { data: Product }) {
  const { t } = useTranslation('common');
  const { id, quantity, balance, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '19' : '17';
  const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }

  if (Number(balance) < 1) {
    return (
      <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand-danger rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className="inline-flex items-center justify-center w-8 h-8 text-4xl rounded-full bg-brand lg:w-10 lg:h-10 text-brand-light focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        <PlusIcon width={iconSize} height={iconSize} opacity="1" />
      </button>
    );
  }
  return <AddToCart data={data} />;
}
const ProductCard: React.FC<ProductProps> = ({ product, className }) => {
  const { name, image, unit, product_type, balance } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const [discountPrices, setDiscountPrice] = useState();
  const [originalPrices, setOriginalPrice] = useState();

  useEffect(() => {
    if (product?.price?.discount) {
      setDiscountPrice(product?.price?.discount);
    }
    if (product?.price?.original) {
      setOriginalPrice(product?.price?.original);
    }
  }, [product]);
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: 'IRR',
  });
  const { price: discountPriceValue } = usePrice({
    amount: discountPrices ? discountPrices / 10 : 0,
    currencyCode: 'IRR',
  });
  const discountPrice = `${discountPriceValue.replace('IRR', '').trim()}`;

  const { price: originalPriceValue } = usePrice({
    amount: originalPrices ? originalPrices / 10 : 0,
    currencyCode: 'IRR',
  });
  const originalPrice = `${originalPriceValue.replace('IRR', '').trim()}`;
  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className
      )}
      onClick={handlePopupView}
      title={name}
    >
      <div className="relative shrink-0">
        <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={
              image
                ? image?.cover
                  ? `http://localhost:5000${image?.cover}`
                  : defaultImage
                : productPlaceholder
            }
            alt={name || 'Product Image'}
            width={230}
            height={200}
            quality={100}
            className="object-cover bg-fill-thumbnail"
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {discount && (
            <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {t('text-on-sale')}
            </span>
          )}
          <div className="block product-count-button-position">
            <RenderPopupOrAddToCart data={product} />
          </div>
        </div>
      </div>
      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <h2
          className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5 h-12"
          dir="rtl"
        >
          {name}
        </h2>
        <div className="mb-1 lg:mb-1.5 -mx-1">
          <div dir="rtl" className="mb-4">
            {Number(balance) < 10 ? (
              <p className="text-xs text-red-500">
                تنها {balance} عدد در انبار باقی مانده
              </p>
            ) : (
              <p className="text-xs text-red-500 invisible">
                تنها {balance} عدد در انبار باقی مانده
              </p>
            )}
          </div>
          <div className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark w-full px-1">
            {' '}
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  style={{ marginRight: '8px' }}
                  width="16px"
                  height="16px"
                  src={toman.src}
                  alt="toman"
                />
                {discountPrice ? discountPrice : originalPrice}
              </div>
              {discountPrice && (
                <span
                  style={{
                    marginLeft: '8px',
                    backgroundColor: 'red',
                    borderRadius: '15px',
                    paddingLeft: '6px',
                    fontSize: '2vh',
                    color: 'white',
                    paddingRight: '6px',
                  }}
                >
                  {Math.round(
                    ((originalPrices - discountPrices) / originalPrices) * 100
                  )}
                  %
                </span>
              )}
            </span>
          </div>
          {discountPrice && (
            <div className="mx-1 text-sm text-brand-dark text-opacity-70">
              <del dir="rtl">
                {discountPrice
                  ? originalPrice.replace(' تومان', '')
                  : originalPrice}
              </del>
            </div>
          )}
        </div>
        {/* <div className="mt-auto text-13px sm:text-sm">{unit}</div> */}
      </div>
    </article>
  );
};

export default ProductCard;
