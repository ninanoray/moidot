import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

interface PaginateNavigationProps {
  currentPage: number;
  updateCurrentPage: (page: number) => void;
  total: number;
  className?: string | undefined;
}

const PaginateNavigation = ({
  currentPage,
  updateCurrentPage,
  total,
  className,
}: PaginateNavigationProps) => {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="" />
        </PaginationItem>
        {Array.from({ length: total }).map((_, index) => {
          const page = index + 1;
          return (
            <PaginationItem key={"page_" + page}>
              <PaginationLink
                href=""
                isActive={currentPage === page}
                onClick={() => updateCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationEllipsis href="" />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginateNavigation;
