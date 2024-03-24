import { useRouter } from 'next/router';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useMemo, useState } from 'react';
import Image from '@components/ui/image';
import { useTranslation } from 'next-i18next';
import { FaCheck } from 'react-icons/fa';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function checkIsActive(arr: any, item: string) {
  if (arr.includes(item)) {
    return true;
  }
  return false;
}

function CategoryFilterMenu({ items, className }: any) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleClick = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div>
      <List>
        {items?.map((item: any) => (
          <div key={`${item.slug}-key-${item.id}`}>
            <ListItem
              button
              onClick={() => handleClick(item.slug)}
              className="flex flex-row justify-end"
              style={{ textAlign: 'right' }}
            >
              <span className="pl-5">
                {openCategory === item.slug ? <ExpandLess /> : <ExpandMore />}
              </span>
              <ListItemText primary={item.name} />
            </ListItem>
            <Collapse
              in={openCategory === item.slug}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {item.subcategories?.map((sub: any) => (
                  <ListItem key={sub.id} button>
                    <ListItemText primary={sub.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
}

export default CategoryFilterMenu;
