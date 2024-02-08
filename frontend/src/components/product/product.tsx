import CartIcon from '@components/icons/cart-icon';
import Button from '@components/ui/button';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Counter from '@components/ui/counter';
import Heading from '@components/ui/heading';
import Image from '@components/ui/image';
import SocialShareBox from '@components/ui/social-share-box';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import {
  useIsProductExistInWishlistQuery,
  useWishlistProductMutation,
} from '@framework/product/product-wishlist';
import { ProductType } from '@framework/product/types';
import usePrice from '@framework/product/use-price';
import { generateCartItem } from '@utils/generate-cart-item';
import getFullUrl from '@utils/imgurl';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { IoArrowRedoOutline } from 'react-icons/io5';

interface Props {
  product: ProductType['response'];
}

const ProductSingleDetails = ({ product }: Props) => {
  const { t } = useTranslation('common');
  const { withAuth, isAuthorized } = useUI();
  const { query } = useRouter();

  const {
    addItemToCart,
    isInCart,
    getItemFromCart,
    isInStock,
    removeItemFromCart,
  } = useCart();
  const selectedCartQty = getItemFromCart(product.id)?.quantity;

  const { price, basePrice, discount } = usePrice({
    amount: Number(product.price.discount),
    baseAmount: Number(product.price.original),
    currencyCode: 'IRR',
  });

  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PRODUCT}/${query.slug}`;

  const shareProduct = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

  const item = generateCartItem({
    id: product.id,
    name: product.name,
    price: Number(product.price.original),
    sale_price: Number(product.price.discount),
    stock: product.balance,
    // quantity: product?.balance,
  });

  const outOfStock = isInCart(product.id) && !isInStock(product.id);

  const addToCart = () => {
    addItemToCart(item, 1);
  };

  const { data: isWishListed, refetch: fetchIsWishListed } =
    useIsProductExistInWishlistQuery(product.id || '');

  const {
    add: addToWishlist,
    remove: removeFromWishlist,
    isLoading,
  } = useWishlistProductMutation();

  const handleAddToWishList = () => {
    addToWishlist.mutate(product.id || '', {
      onSuccess() {
        fetchIsWishListed();
      },
    });
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist.mutate(product.id || '', {
      onSuccess() {
        fetchIsWishListed();
      },
    });
  };

  return (
    <div className="pt-6 pb-2 md:pt-7">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8">
        {/* product images */}
        <div className="col-span-5 mb-6 overflow-hidden xl:col-span-6 md:mb-8 lg:mb-0">
          {product?.image.images.length > 0 ? (
            <ThumbnailCarousel
              gallery={product.image.images}
              thumbnailClassName="xl:w-[700px] 2xl:w-[900px]"
              galleryClassName="xl:w-[150px] 2xl:w-[170px]"
            />
          ) : (
            <div className="flex items-center justify-center w-auto">
              <Image
                src={
                  product?.image.cover
                    ? getFullUrl(product.image.cover)
                    : '/product-placeholder.svg'
                }
                alt={product?.name!}
                width={900}
                height={680}
              />
            </div>
          )}
        </div>

        {/* product base information */}
        <div className="flex flex-col col-span-5 shrink-0 xl:col-span-4 xl:ltr:pl-2 xl:rtl:pr-2">
          <div className="pb-3 lg:pb-5">
            {/* name and heading */}
            <div className="md:mb-2.5 block -mt-1.5">
              <Heading dir="rtl" variant="titleLarge">
                {product?.name}
              </Heading>
              <>
                {Number(product.balance) > 0 || !outOfStock ? (
                  <span className="text-sm font-medium text-yellow">
                    {`
                   ${t('text-only')}
                   ${Number(selectedCartQty)}
                   ${t('text-left-item')}
                  `}
                  </span>
                ) : (
                  <div className="text-base text-red-500 whitespace-nowrap">
                    {t('text-out-stock')}
                  </div>
                )}
              </>
            </div>

            {/* price */}
            <div className="flex items-center mt-5">
              <div className="text-brand-dark font-bold text-base md:text-xl xl:text-[22px]">
                {price}
              </div>
              {discount && (
                <>
                  <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark ">
                    {basePrice}
                  </del>
                  <span className="inline-block rounded font-bold text-xs md:text-sm bg-brand-tree bg-opacity-20 text-brand-tree uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
                    {discount} {t('text-off')}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            <div className="flex flex-row-reverse items-center gap-5">
              {/* counter and add to cart */}
              {isInCart(product.id) ? (
                <>
                  <Counter
                    className="w-1/2"
                    variant="single"
                    value={selectedCartQty || 1}
                    onIncrement={() => addToCart()}
                    onDecrement={() => removeItemFromCart(product.id)}
                    onDeleteItem={() => {
                      removeItemFromCart(product.id);
                    }}
                    // disabled={
                    //   isInCart(product.id)
                    //     ? selectedCartQty + selectedQuantity >=
                    //       Number(item.stock)
                    //     : selectedQuantity >= Number(item.stock)
                    // }
                  />

                  <h1>محصول در سبد خرید شما موجود است</h1>
                </>
              ) : (
                <Button
                  onClick={addToCart}
                  className="w-full px-1.5"
                  disabled={outOfStock}
                >
                  <CartIcon color="#ffffff" className="ltr:mr-3 rtl:ml-3" />
                  {t('text-add-to-cart')}
                </Button>
              )}
            </div>
            {/* add to wishlist */}
            <div className="grid grid-cols-2 gap-2.5">
              <Button
                variant="border"
                loading={isLoading}
                onClick={() => {
                  if (isWishListed?.isFavorite) {
                    withAuth(handleRemoveFromWishlist);
                  } else {
                    withAuth(handleAddToWishList);
                  }
                }}
                className={`group hover:text-brand ${
                  isWishListed?.isFavorite === true && 'text-brand'
                }`}
              >
                {isWishListed?.isFavorite === true ? (
                  <IoIosHeart className="text-red-600 text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all" />
                ) : (
                  <IoIosHeartEmpty className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                )}

                {t('text-wishlist')}
              </Button>

              {/* share */}
              <div className="relative group">
                <Button
                  variant="border"
                  className={`w-full hover:text-brand ${
                    shareButtonStatus === true && 'text-brand'
                  }`}
                  onClick={shareProduct}
                >
                  <IoArrowRedoOutline className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                  {t('text-share')}
                </Button>
                <SocialShareBox
                  className={`absolute z-10 ltr:right-0 rtl:left-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${
                    shareButtonStatus === true
                      ? 'visible opacity-100 top-full'
                      : 'opacity-0 invisible top-[130%]'
                  }`}
                  shareUrl={productUrl}
                />
              </div>
            </div>
          </div>
          {/* {product?.tag && (
            <ul className="pt-5 xl:pt-6">
              <li className="relative inline-flex items-center justify-center text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 top-1">
                <LabelIcon className="ltr:mr-2 rtl:ml-2" /> {t('text-tags')}:
              </li>
              {product?.tag?.map((item: any) => (
                <li className="inline-block p-[3px]" key={`tag-${item.id}`}>
                  <TagLabel product={item} />
                </li>
              ))}
            </ul>
          )} */}
        </div>
      </div>
      {/* <ProductDetailsTab /> */}
    </div>
  );
};

export default ProductSingleDetails;
