import { FC, ReactNode } from "react";
import clsx from "clsx";
import { ListItem } from "../../shared/types";
import { Icon } from "../Icon";
import styles from "./List.module.css";

interface ListProps {
  title?: ReactNode;
  items?: ListItem[] | null;
}

const List: FC<ListProps> = ({ title, items }) => {
  if (!items) {
    return null;
  }

  return (
    <div className={styles.root}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <div className={styles.items}>
        {items.map(({ id, label, tag }) => (
          <button type="button" className={styles.item} key={id}>
            <span className={clsx(styles.itemLeft, tag && styles.itemWithTag)}>
              {label}
            </span>
            <span className={styles.itemRight}>
              {tag ? (
                <span className={styles.itemTag}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </span>
              ) : null}
              <Icon name="arrowRight" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default List;
