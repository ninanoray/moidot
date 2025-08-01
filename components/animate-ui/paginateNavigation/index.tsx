import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
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
  const DisplaySize = 5;
  const lastHeadPage = DisplaySize - 2;
  const firstTailPage = total - (lastHeadPage - 1);

  if (total <= DisplaySize)
    return (
      <Pagination className={className}>
        <PaginationContent>
          {Array.from({ length: total }).map((_, index) => {
            const page = index + 1;
            return (
              <PaginationItem key={"page_" + page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => updateCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        </PaginationContent>
      </Pagination>
    );
  else {
    if (currentPage <= lastHeadPage) {
      return (
        <Pagination className={className}>
          <PaginationContent>
            {Array.from({ length: DisplaySize - 2 }).map((_, index) => {
              const page = index + 1;
              return (
                <PaginationItem key={"page_" + page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => updateCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationNextEllipsisItem
              page={currentPage}
              upadate={updateCurrentPage}
            />
            <PaginationItem>
              <PaginationLink
                aria-label="go to last page"
                isActive={currentPage === total}
                onClick={() => updateCurrentPage(total)}
              >
                {total}
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
    } else if (currentPage >= firstTailPage) {
      return (
        <Pagination className={className}>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                aria-label="go to first page"
                isActive={currentPage === 1}
                onClick={() => updateCurrentPage(1)}
              >
                {1}
              </PaginationLink>
            </PaginationItem>
            <PaginationPreviousEllipsisItem
              page={currentPage}
              upadate={updateCurrentPage}
            />
            {Array.from({ length: DisplaySize - 2 }).map((_, index) => {
              const page = index + firstTailPage;
              return (
                <PaginationItem key={"page_" + page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => updateCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </PaginationContent>
        </Pagination>
      );
    } else {
      return (
        <Pagination className={className}>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                aria-label="go to first page"
                isActive={currentPage === 1}
                onClick={() => updateCurrentPage(1)}
              >
                {1}
              </PaginationLink>
            </PaginationItem>
            <PaginationPreviousEllipsisItem
              page={currentPage}
              upadate={updateCurrentPage}
            />
            {Array.from({ length: DisplaySize - 2 }).map((_, index) => {
              const page = index + currentPage - 1;
              return (
                <PaginationItem key={"page_" + page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => updateCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationNextEllipsisItem
              page={currentPage}
              upadate={updateCurrentPage}
            />
            <PaginationItem>
              <PaginationLink
                aria-label="go to first last"
                isActive={currentPage === total}
                onClick={() => updateCurrentPage(total)}
              >
                {total}
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
    }
  }
};

export default PaginateNavigation;

interface PaginationEllipsisItemProps {
  page: number;
  upadate: (page: number) => void;
}
const PaginationPreviousEllipsisItem = ({
  page,
  upadate,
}: PaginationEllipsisItemProps) => {
  return (
    <PaginationItem>
      <PaginationEllipsis
        aria-label="Go to previous page"
        onClick={() => upadate(page - 1)}
      />
    </PaginationItem>
  );
};

const PaginationNextEllipsisItem = ({
  page,
  upadate,
}: PaginationEllipsisItemProps) => {
  return (
    <PaginationItem>
      <PaginationEllipsis
        aria-label="Go to next page"
        onClick={() => upadate(page + 1)}
      />
    </PaginationItem>
  );
};
