import * as React from "react";
import { Route, Switch } from "react-router-dom";

// import TableList from "./TableList";
// import BasicList from "./BasicList";
// import CardList from "./CardList";
// import Search from "./List";

import { ReactLoadable } from "../../components/ReactLoadable";

const PARENT_URL = "/list";

const routeMap = [
    {
        name: "查询表格",
        path: `${PARENT_URL}/table-list`,
        component: ReactLoadable(() => import("./TableList"))
    },
    {
        name: "标准列表",
        path: `${PARENT_URL}/basic-list`,
        component: ReactLoadable(() => import("./BasicList"))
    },
    {
        name: "卡片列表",
        path: `${PARENT_URL}/card-list`,
        component: ReactLoadable(() => import("./CardList"))
    },
    {
        name: "搜索列表",
        path: `${PARENT_URL}/search`,
        component: ReactLoadable(() => import("./List"))
    }
];

/**
 * @class
 */
class Form extends React.Component {
    public render() {
        return (
            <div className="List">
                <Switch>
                    {routeMap.map((item, index) => {
                        if (index === 3) {
                            return (
                                <Route
                                    key={index}
                                    exact={false}
                                    path={item.path}
                                    name={item.name}
                                    component={item.component}
                                />
                            );
                        } else {
                            return (
                                <Route
                                    key={index}
                                    exact={true}
                                    path={item.path}
                                    name={item.name}
                                    component={item.component}
                                />
                            );
                        }
                    })}
                </Switch>
            </div>
        );
    }
}

export default Form;
