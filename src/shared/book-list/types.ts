import { IBooksAPI } from "../../services/book-search";

export interface BookListProps extends IBooksAPI {
    onWishlistStatusChange: (bookId: string, isInWishlist: boolean) => void,
}
