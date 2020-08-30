
import { IBook } from '../../services/book-search';

export interface BookProps extends IBook {
    isInWishlist?: boolean,
    onWishlistStatusChange: (bookId: string, isInWishlist: boolean) => void,
}