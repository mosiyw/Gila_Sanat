/* eslint-disable react-hooks/exhaustive-deps */
import {
  ModalProvider,
  useModalAction,
} from '@components/common/modal/modal.context';
import { getToken } from '@framework/utils/get-token';
import React, { createContext, useReducer } from 'react';
import { Action, DRAWER_VIEWS } from './actions.types';
import { CartProvider } from './cart/cart.context';
import { ContextType, State } from './context.types';

const initialState: State = {
  isAuthorized: getToken() ? true : false,
  displaySidebar: false,
  displayFilter: false,
  displayCart: false,
  displaySearch: false,
  displayMobileSearch: false,
  displayDrawer: false,
  drawerView: null,
  toastText: '',
  isStickyheader: false,
  data: null,
};

export const UIContext = createContext<State | any>(initialState);

function uiReducer(state: State, action: Action) {
  const { type } = action;

  switch (type) {
    case 'SET_AUTHORIZED': {
      return {
        ...state,
        isAuthorized: true,
      };
    }
    case 'SET_UNAUTHORIZED': {
      return {
        ...state,
        isAuthorized: false,
      };
    }
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
        drawerView: null,
      };
    }
    case 'OPEN_SHOP': {
      return {
        ...state,
        displayShop: true,
      };
    }
    case 'CLOSE_SHOP': {
      return {
        ...state,
        displayShop: false,
        drawerView: null,
      };
    }
    case 'OPEN_CART': {
      return {
        ...state,
        displayCart: true,
      };
    }
    case 'CLOSE_CART': {
      return {
        ...state,
        displayCart: false,
      };
    }
    case 'OPEN_SEARCH': {
      return {
        ...state,
        displaySearch: true,
      };
    }
    case 'CLOSE_SEARCH': {
      return {
        ...state,
        displaySearch: false,
      };
    }
    case 'OPEN_MOBILE_SEARCH': {
      return {
        ...state,
        displayMobileSearch: true,
      };
    }
    case 'CLOSE_MOBILE_SEARCH': {
      return {
        ...state,
        displayMobileSearch: false,
      };
    }
    case 'OPEN_FILTER': {
      return {
        ...state,
        displayFilter: true,
      };
    }
    case 'CLOSE_FILTER': {
      return {
        ...state,
        displayFilter: false,
      };
    }
    case 'OPEN_DRAWER': {
      return {
        ...state,
        displayDrawer: true,
        displaySidebar: false,
        data: action.data,
      };
    }
    case 'CLOSE_DRAWER': {
      return {
        ...state,
        displayDrawer: false,
      };
    }
    case 'SET_DRAWER_VIEW': {
      return {
        ...state,
        drawerView: action.view,
      };
    }
    case 'SET_TOAST_TEXT': {
      return {
        ...state,
        toastText: action.text,
      };
    }
    case 'SET_USER_AVATAR': {
      return {
        ...state,
        userAvatar: action.value,
      };
    }
    case 'ENABLE_STICKY_HEADER': {
      return {
        ...state,
        isStickyheader: true,
      };
    }
    case 'DISABLE_STICKY_HEADER': {
      return {
        ...state,
        isStickyheader: false,
      };
    }
  }
}

export const UIProvider: React.FC = (props) => {
  const { openModal } = useModalAction();

  const [state, dispatch] = useReducer(uiReducer, initialState);

  const withAuth = (fn: Function) => {
    if (state.isAuthorized) {
      return fn();
    } else {
      return openModal('LOGIN_VIEW');
    }
  };

  const authorize = () => dispatch({ type: 'SET_AUTHORIZED' });
  const unauthorize = () => dispatch({ type: 'SET_UNAUTHORIZED' });
  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' });
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' });
  const openShop = () => dispatch({ type: 'OPEN_SHOP' });
  const closeShop = () => dispatch({ type: 'CLOSE_SHOP' });
  const toggleSidebar = () =>
    state.displaySidebar
      ? dispatch({ type: 'CLOSE_SIDEBAR' })
      : dispatch({ type: 'OPEN_SIDEBAR' });
  const closeSidebarIfPresent = () =>
    state.displaySidebar && dispatch({ type: 'CLOSE_CART' });
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });
  const toggleCart = () =>
    state.displaySidebar
      ? dispatch({ type: 'CLOSE_CART' })
      : dispatch({ type: 'OPEN_CART' });
  const closeCartIfPresent = () =>
    state.displaySidebar && dispatch({ type: 'CLOSE_CART' });
  const openFilter = () => dispatch({ type: 'OPEN_FILTER' });
  const closeFilter = () => dispatch({ type: 'CLOSE_FILTER' });
  const openSearch = () => dispatch({ type: 'OPEN_SEARCH' });
  const closeSearch = () => dispatch({ type: 'CLOSE_SEARCH' });
  const openMobileSearch = () => dispatch({ type: 'OPEN_MOBILE_SEARCH' });
  const closeMobileSearch = () => dispatch({ type: 'CLOSE_MOBILE_SEARCH' });
  const toggleMobileSearch = () =>
    state.displayMobileSearch
      ? dispatch({ type: 'CLOSE_MOBILE_SEARCH' })
      : dispatch({ type: 'OPEN_MOBILE_SEARCH' });
  const openDrawer = (data?: any) => dispatch({ type: 'OPEN_DRAWER', data });
  const closeDrawer = () => dispatch({ type: 'CLOSE_DRAWER' });
  const setUserAvatar = (_value: string) =>
    dispatch({ type: 'SET_USER_AVATAR', value: _value });
  const setDrawerView = (view: DRAWER_VIEWS) =>
    dispatch({ type: 'SET_DRAWER_VIEW', view });
  const enableStickyHeader = () => dispatch({ type: 'ENABLE_STICKY_HEADER' });
  const disableStickyHeader = () => dispatch({ type: 'DISABLE_STICKY_HEADER' });

  const value = React.useMemo(
    () => ({
      ...state,
      authorize,
      unauthorize,
      openSidebar,
      closeSidebar,
      openShop,
      closeShop,
      toggleSidebar,
      closeSidebarIfPresent,
      openCart,
      closeCart,
      toggleCart,
      closeCartIfPresent,
      openFilter,
      closeFilter,
      openDrawer,
      closeDrawer,
      openSearch,
      closeSearch,
      openMobileSearch,
      closeMobileSearch,
      toggleMobileSearch,
      setDrawerView,
      setUserAvatar,
      enableStickyHeader,
      disableStickyHeader,
      withAuth,
    }),
    [
      closeCartIfPresent,
      closeSidebarIfPresent,
      state,
      toggleCart,
      toggleMobileSearch,
      toggleSidebar,
    ]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = (): ContextType => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext: React.FC = ({ children }) => (
  <CartProvider>
    <ModalProvider>
      <UIProvider>{children}</UIProvider>
    </ModalProvider>
  </CartProvider>
);
