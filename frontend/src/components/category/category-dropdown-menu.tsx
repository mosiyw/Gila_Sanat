// @ts-nocheck
import Alert from '@components/ui/alert';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import cn from 'classnames';
import CategoryMenu from '@components/ui/category-menu';

interface CategoryDropdownProps {
  className?: string;
  data: any;
  loading: boolean;
  error: any;
}

const CategoryDropdownMenu: React.FC<CategoryDropdownProps> = ({
  className,
  query,
}) => {
  const { data, isLoading: loading, error } = query;
  return (
    <div className={cn('absolute z-30', className)}>
      <div className="max-h-full overflow-hidden">
        {error ? (
          <div className="2xl:ltr:pr-4 2xl:rtl:pl-4">
            <Alert message={error.message} />
          </div>
        ) : loading && !data?.categories?.data?.length ? (
          Array.from({ length: 15 }).map((_, idx) => (
            <CategoryListCardLoader
              key={`category-list-${idx}`}
              uniqueKey="category-list-card-loader"
            />
          ))
        ) : (
          <CategoryMenu items={data?.categories?.data} className="rounded-lg" />
        )}
      </div>
    </div>
  );
};

export default CategoryDropdownMenu;
