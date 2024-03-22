import cn from 'classnames';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Link from '@components/ui/link';
import { IoIosArrowBack } from 'react-icons/io';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import { List, ListItem, Grid } from '@mui/material';
import { chunk } from 'lodash';

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
  const { name, isTitle, icon } = item;

  return (
    <>
      {isTitle ? (
        <ListItem
          key={`${name}${item._id}`}
          style={{ borderRight: '2px solid rgb(251, 174, 23)' }}
          className="text-sm mb-1 px-3 py-1 text-brand-muted hover:text-brand"
        >
          {name}
        </ListItem>
      ) : (
        <ListItem
          key={`${name}${item._id}`}
          className="text-xs px-3 py-1 text-brand-muted hover:text-brand mb-0.5"
        >
          {name}
        </ListItem>
      )}
    </>
  );
}

function SidebarMenu({ items, className }: any) {
  const [activeCategory, setActiveCategory] = useState(items?.[0]); // Set initial active category to the first item
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    const newChunks = [];
    if (activeCategory?.subcategories) {
      activeCategory.subcategories.forEach((subcategory) => {
        newChunks.push({ name: subcategory.name, isTitle: true });
        if (subcategory.second_subcategories) {
          subcategory.second_subcategories.forEach((second_subcategory) => {
            newChunks.push({ name: second_subcategory.name, isTitle: false });
          });
        }
      });
    }
    setChunks(newChunks);
  }, [activeCategory]);

  const chunkedChunks = chunk(chunks, 10);

  return (
    <div
      className={cn(
        'w-[80vw]  h-[360px]  bg-brand-light border border-border-base  category-dropdown-menu',
        className
      )}
    >
      <Grid container spacing={2} className="h-[110%]">
        <Grid item xs={2.6} className="border-l h-[100%]">
          {items?.map((item: any) => (
            <SidebarMenuItem
              key={`${item._id}-key-${item.id}`}
              item={item}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </Grid>
        <Grid item xs={9.4}>
          <div className="z-10 w-full h-full  md:block right-full">
            <Grid container spacing={2}>
              {chunkedChunks.map((chunkGroup, groupIndex) => (
                <Grid item xs={2.4} key={groupIndex}>
                  <List>
                    {chunkGroup.map((chunk, index) => (
                      <SidebarMenuSubItem
                        key={`${chunk.name}${index}`}
                        item={chunk}
                        depth={1}
                        className={cn(
                          'text-sm px-3 py-3 ltr:pr-3 rtl:pl-3 text-brand-muted hover:text-brand border-b border-border-base last:border-b-0 mb-0.5'
                        )}
                        setActiveCategory={setActiveCategory}
                      />
                    ))}
                  </List>
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default SidebarMenu;
