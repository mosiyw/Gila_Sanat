import cn from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Link from '@components/ui/link';
import { IoIosArrowBack } from 'react-icons/io';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import Grid from '@mui/material/Grid';

function SidebarMenuItem({
  className,
  item,
  depth = 0,
  setActiveCategory,
}: any) {
  const { t } = useTranslation('common');
  const { name, subcategories, second_subcategories, icon } = item;

  return (
    <>
      <li
        className={`flex justify-between items-center transition ${
          className
            ? className
            : 'text-sm hover:text-brand px-3.5 2xl:px-4 py-2.5 border-b border-border-base last:border-b-0'
        }`}
        onMouseEnter={() => setActiveCategory(item)} // Change active category on hover
      >
        <Link
          href={ROUTES.SEARCH}
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none focus:ring-0 focus:text-brand-dark'
          )}
        >
          <span className="capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4">
            {name}
          </span>
          {(subcategories || second_subcategories) && (
            <span className="mr-auto">
              <IoIosArrowBack className="text-15px text-brand-dark text-opacity-40" />
            </span>
          )}
        </Link>
        {Array.isArray(second_subcategories) && depth === 1 && (
          <ul className="text-xs mt-2">
            {second_subcategories.map((subcategory) => (
              <SidebarMenuItem
                key={`${subcategory.name}${subcategory._id}`}
                item={subcategory}
                depth={2}
                className="text-xs px-3 py-1 text-brand-muted hover:text-brand border-b border-border-base last:border-b-0 mb-0.5"
                setActiveCategory={setActiveCategory}
              />
            ))}
          </ul>
        )}
      </li>
    </>
  );
}
function SidebarMenuSubItem({
  className,
  item,
  depth = 0,
  setActiveCategory,
}: any) {
  const { t } = useTranslation('common');
  const { name, subcategories, second_subcategories, icon } = item;

  return (
    <>
      {Array.isArray(second_subcategories) && depth === 1 && (
        <div className="mt-2">
          <div className="flex items-center">
            <span
              className="text-sm mb-1 px-3 py-1 text-brand-muted"
              style={{ borderRight: '2px solid rgb(251, 174, 23)' }}
            >
              {name}
            </span>
            <span>
              <IoIosArrowBack className="text-sm text-brand-dark text-opacity-40" />
            </span>
          </div>
          <ul className="text-xs">
            {second_subcategories.map((subcategory) => (
              <li
                key={`${subcategory.name}${subcategory._id}`}
                className="text-xs px-3 py-1 text-brand-muted hover:text-brand mb-0.5"
              >
                {subcategory.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
function SidebarMenu({ items, className }: any) {
  const [activeCategory, setActiveCategory] = useState(items[0]); // Set initial active category to the first item

  return (
    <div
      className={cn(
        'w-[80vw] md:w-[80vw] h-430px bg-brand-light border border-border-base  category-dropdown-menu pt-1.5',
        className
      )}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {items?.map((item: any) => (
            <SidebarMenuItem
              key={`${item._id}-key-${item.id}`}
              item={item}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </Grid>
        <Grid item xs={9}>
          <div className="z-10 w-full h-full border  md:block right-full bg-brand-light border-border-base">
            <Grid container spacing={2}>
              <Grid item xs={3}>
                {activeCategory.subcategories?.map((subcategory) => (
                  <SidebarMenuSubItem
                    key={`${subcategory.name}${subcategory._id}`}
                    item={subcategory}
                    depth={1}
                    className={cn(
                      'text-sm px-3 py-3 ltr:pr-3 rtl:pl-3 text-brand-muted hover:text-brand border-b border-border-base last:border-b-0 mb-0.5'
                    )}
                    setActiveCategory={setActiveCategory}
                  />
                ))}
              </Grid>
              <Grid item xs={3}>
                {activeCategory.subcategories?.map((subcategory) => (
                  <SidebarMenuSubItem
                    key={`${subcategory.name}${subcategory._id}`}
                    item={subcategory}
                    depth={1}
                    className={cn(
                      'text-sm px-3 py-3 ltr:pr-3 rtl:pl-3 text-brand-muted hover:text-brand border-b border-border-base last:border-b-0 mb-0.5'
                    )}
                    setActiveCategory={setActiveCategory}
                  />
                ))}
              </Grid>
              <Grid item xs={3}>
                {activeCategory.subcategories?.map((subcategory) => (
                  <SidebarMenuSubItem
                    key={`${subcategory.name}${subcategory._id}`}
                    item={subcategory}
                    depth={1}
                    className={cn(
                      'text-sm px-3 py-3 ltr:pr-3 rtl:pl-3 text-brand-muted hover:text-brand border-b border-border-base last:border-b-0 mb-0.5'
                    )}
                    setActiveCategory={setActiveCategory}
                  />
                ))}
              </Grid>
              <Grid item xs={3}>
                {activeCategory.subcategories?.map((subcategory) => (
                  <SidebarMenuSubItem
                    key={`${subcategory.name}${subcategory._id}`}
                    item={subcategory}
                    depth={1}
                    className={cn(
                      'text-sm px-3 py-3 ltr:pr-3 rtl:pl-3 text-brand-muted hover:text-brand border-b border-border-base last:border-b-0 mb-0.5'
                    )}
                    setActiveCategory={setActiveCategory}
                  />
                ))}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SidebarMenu;
