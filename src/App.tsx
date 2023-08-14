import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { List, Icon, Loader } from "./components";
import { useAsync } from "./hooks";
import { getInvites, getUsers } from "./api/users";
import { groupBy } from "./utils";
import { Invite, TeamMember, ListItem } from "./shared/types";
import styles from "./App.module.css";

const isTeamMember = (item: TeamMember | Invite): item is TeamMember => {
  return "user" in item;
};

const mapToListItems = (array: (TeamMember | Invite)[]) => {
  return array.map((item) => ({
    id: uuid(),
    label: isTeamMember(item)
      ? `${item.user.name} ${item.user.lastName}`
      : item.phone,
    ...(isTeamMember(item) ? {} : { tag: "invited" }),
  }));
};

const App = () => {
  const [listItems, setListItems] = useState<{
    admin: ListItem[] | null;
    standard: ListItem[] | null;
  }>({
    admin: null,
    standard: null,
  });
  const fetchData = useCallback(
    () => Promise.all([getUsers(), getInvites()]),
    []
  );
  const { data, loading } = useAsync(fetchData, true);

  useEffect(() => {
    if (data) {
      const [usersResponse, invitesResponse] = data;
      const groupedResponse = groupBy(
        [...usersResponse, ...invitesResponse],
        "role"
      );
      setListItems(() => ({
        admin: mapToListItems(groupedResponse.Administrator),
        standard: mapToListItems(groupedResponse.Standard),
      }));
    }
  }, [data]);

  return (
    <div className={styles.root}>
      {loading || !data ? (
        <Loader />
      ) : (
        <>
          <List
            title={
              <>
                <Icon name="admin" className={styles.listIcon} /> Administrators
              </>
            }
            items={listItems.admin}
          />
          <List
            title={
              <>
                <Icon name="user" className={styles.listIcon} /> Standard Users
              </>
            }
            items={listItems.standard}
          />
        </>
      )}
    </div>
  );
};

export default App;
