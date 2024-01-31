import CartIcon from '@components/icons/cart-icon';
import LabelIcon from '@components/icons/label-icon';
import ProductAttributes from '@components/product/product-attributes';
import ProductDetailsTab from '@components/product/product-details/product-tab';
import Button from '@components/ui/button';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Counter from '@components/ui/counter';
import Image from '@components/ui/image';
import SocialShareBox from '@components/ui/social-share-box';
import TagLabel from '@components/ui/tag-label';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import {
  useIsProductExistInWishlistQuery,
  useWishlistProductMutation,
} from '@framework/product/product-wishlist';
import { ProductType } from '@framework/product/types';
import usePrice from '@framework/product/use-price';
import { getVariations } from '@framework/utils/get-variations';
import { generateCartItem } from '@utils/generate-cart-item';
import getFullUrl from '@utils/imgurl';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { IoArrowRedoOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import VariationPrice from './variation-price';

interface Props {
  product: ProductType['response'];
}

const ProductSingleDetails = ({ product }: Props) => {
  const { t } = useTranslation('common');
  const { withAuth } = useUI();

  const { query } = useRouter();
  const productID = query.slug?.[0];

  const { data: isWishListed, refetch: fetchIsWishListed } =
    useIsProductExistInWishlistQuery(productID || '');

  const {
    add: addToWishlist,
    remove: removeFromWishlist,
    isLoading,
  } = useWishlistProductMutation();

  const handleAddToWishList = () => {
    addToWishlist.mutate(productID || '', {
      onSuccess() {
        fetchIsWishListed();
      },
    });
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist.mutate(productID || '', {
      onSuccess() {
        fetchIsWishListed();
      },
    });
  };

  const { width } = useWindowSize();
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [favorite, setFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PRODUCT}/${query.slug}`;
  const { price, basePrice, discount } = usePrice(product);

  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

  const variations = getVariations(product?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  let selectedVariation: any = {};

  if (isSelected) {
    const productVaiOption: any = product?.variation_options;
    selectedVariation = productVaiOption?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }

  const item = generateCartItem(product!, selectedVariation);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);

  const addToCart = () => {
    if (!isSelected) return;
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    const item = generateCartItem(product!, selectedVariation);

    addItemToCart(item, quantity);
    toast('Added to the bag', {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="pt-6 pb-2 md:pt-7">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8">
        <div className="col-span-5 mb-6 overflow-hidden xl:col-span-6 md:mb-8 lg:mb-0">
          {!!product?.image?.length ? (
            <ThumbnailCarousel
              gallery={product?.image ?? getFullUrl(product.image.images)}
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

        <div className="flex flex-col col-span-5 shrink-0 xl:col-span-4 xl:ltr:pl-2 xl:rtl:pr-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
                {product?.name}
              </h2>
            </div>
            {product?.unit && isEmpty(variations) ? (
              <div className="text-sm font-medium md:text-15px">
                {product?.unit}
              </div>
            ) : (
              <VariationPrice
                selectedVariation={selectedVariation}
                minPrice={product?.min_price}
                maxPrice={product?.max_price}
              />
            )}

            {isEmpty(variations) && (
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
            )}
          </div>

          {Object.keys(variations).map((variation) => {
            return (
              <ProductAttributes
                key={`popup-attribute-key${variation}`}
                variations={variations}
                attributes={attributes}
                setAttributes={setAttributes}
              />
            );
          })}

          <div className="pb-2">
            {/* check that item isInCart and place the available quantity or the item quantity */}
            {isEmpty(variations) && (
              <>
                {Number(quantity) > 0 || !outOfStock ? (
                  <span className="text-sm font-medium text-yellow">
                    {t('text-only') +
                      ' ' +
                      quantity +
                      ' ' +
                      t('text-left-item')}
                  </span>
                ) : (
                  <div className="text-base text-red-500 whitespace-nowrap">
                    {t('text-out-stock')}
                  </div>
                )}
              </>
            )}

            {!isEmpty(selectedVariation) && (
              <span className="text-sm font-medium text-yellow">
                {selectedVariation?.is_disable ||
                selectedVariation.quantity === 0
                  ? t('text-out-stock')
                  : `${
                      t('text-only') +
                      ' ' +
                      selectedVariation.quantity +
                      ' ' +
                      t('text-left-item')
                    }`}
              </span>
            )}
          </div>

          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            <Counter
              variant="single"
              value={selectedQuantity}
              onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
              onDecrement={() =>
                setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
              }
              disabled={
                isInCart(item.id)
                  ? getItemFromCart(item.id).quantity + selectedQuantity >=
                    Number(item.stock)
                  : selectedQuantity >= Number(item.stock)
              }
            />

            {/* add to cart */}
            <Button
              onClick={addToCart}
              className="w-full px-1.5"
              disabled={!isSelected}
              loading={addToCartLoader}
            >
              <CartIcon color="#ffffff" className="ltr:mr-3 rtl:ml-3" />
              {t('text-add-to-cart')}
            </Button>

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
                  onClick={handleChange}
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
          {product?.tag && (
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
          )}
        </div>
      </div>
      <ProductDetailsTab />
    </div>
  );
};

export default ProductSingleDetails;
