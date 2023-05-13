import { type IssueCountType } from "./types";
import { type IssueType } from "@/utils/types";

type IssueT = IssueType | IssueType["parent"];

export function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export function getHeaders() {
  return {
    "Content-type": "application/json",
  };
}

export function moveIssueWithinList(payload: {
  issueList: IssueT[];
  oldIndex: number;
  newIndex: number;
}) {
  const { issueList, oldIndex, newIndex } = payload;
  const issueListClone = [...issueList];
  const [removedItem] = issueListClone.splice(oldIndex, 1);

  if (!removedItem) return issueListClone;

  issueListClone.splice(newIndex, 0, removedItem);

  return issueListClone.map((issue, index) => {
    return <IssueT>{
      ...issue,
      listPosition: index,
    };
  });
}

export function insertIssueIntoList(payload: {
  issueList: IssueT[];
  issue: IssueT;
  index: number;
  listId: string | null;
}) {
  const { issueList, issue, index } = payload;
  const issueListClone = [...issueList];
  issueListClone.splice(index, 0, issue);
  return issueListClone.map((issue, index) => {
    return <IssueT>{
      ...issue,
      listPosition: index,
    };
  });
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function capitalizeMany(str: string) {
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

export function getIssueCountByStatus(issues: IssueType[]) {
  return issues.reduce(
    (acc, issue) => {
      acc[issue.status]++;
      return acc;
    },
    {
      TODO: 0,
      IN_PROGRESS: 0,
      DONE: 0,
    } as IssueCountType
  );
}

export function isEpic(issue: IssueType | IssueType["parent"] | null) {
  if (!issue) return false;
  return issue.type == "EPIC";
}

export function sprintId(id: string | null | undefined) {
  return id == "backlog" ? null : id;
}

export function isNullish<T>(
  value: T | null | undefined
): value is null | undefined {
  return value == null || value == undefined;
}
