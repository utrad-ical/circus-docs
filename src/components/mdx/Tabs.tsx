'use client';

import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode
} from 'react';
import styles from './Tabs.module.css';

const SelectedTabContext = createContext<string | null>(null);

type TabsProps = {
  defaultValue?: string;
  values: { label: string; value: string }[];
  /** `<TabItem>` elements */
  children: ReactNode;
};

export const Tabs = (props: TabsProps) => {
  const { defaultValue, values, children } = props;
  const [selected, setSelected] = useState(defaultValue ?? values[0]?.value);
  const id = useId();
  return (
    <div className={styles.tabs}>
      <div role="tablist" className={styles.tabList}>
        {values.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            role="tab"
            id={`${id}-${value}`}
            aria-selected={value === selected}
            className={styles.tab}
            onClick={() => setSelected(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <SelectedTabContext.Provider value={selected ?? null}>
        {children}
      </SelectedTabContext.Provider>
    </div>
  );
};

export const TabItem = (props: { value: string; children: ReactNode }) => {
  const { value, children } = props;
  const selected = useContext(SelectedTabContext);
  return (
    <div role="tabpanel" hidden={value !== selected}>
      {children}
    </div>
  );
};
