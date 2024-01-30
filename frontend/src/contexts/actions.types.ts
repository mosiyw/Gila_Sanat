export type Action =
  | {
      type: 'SET_AUTHORIZED';
    }
  | {
      type: 'SET_UNAUTHORIZED';
    }
  | {
      type: 'OPEN_SIDEBAR';
    }
  | {
      type: 'CLOSE_SIDEBAR';
    }
  | {
      type: 'OPEN_SHOP';
    }
  | {
      type: 'CLOSE_SHOP';
    }
  | {
      type: 'OPEN_CART';
    }
  | {
      type: 'CLOSE_CART';
    }
  | {
      type: 'OPEN_SEARCH';
    }
  | {
      type: 'CLOSE_SEARCH';
    }
  | {
      type: 'OPEN_MOBILE_SEARCH';
    }
  | {
      type: 'CLOSE_MOBILE_SEARCH';
    }
  | {
      type: 'SET_TOAST_TEXT';
      text: ToastText;
    }
  | {
      type: 'OPEN_FILTER';
    }
  | {
      type: 'CLOSE_FILTER';
    }
  | {
      type: 'OPEN_DRAWER';
      data: null;
    }
  | {
      type: 'CLOSE_DRAWER';
    }
  | {
      type: 'SET_DRAWER_VIEW';
      view: DRAWER_VIEWS;
    }
  | {
      type: 'SET_USER_AVATAR';
      value: string;
    }
  | {
      type: 'ENABLE_STICKY_HEADER';
    }
  | {
      type: 'DISABLE_STICKY_HEADER';
    };

export type DRAWER_VIEWS = 'CART_SIDEBAR' | 'MOBILE_MENU' | 'ORDER_DETAILS';

export type ToastText = string;
