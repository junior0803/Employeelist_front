# Typescript Testing

In this sample we will add a link in the Employees page that will navigate to a "new Employee page". This new page will display a form where you have to enter the avatar url, login and id of a new Employee (just supossing we can edit that info).

We will take a startup point sample _06 AJAX Call_.

Summary steps:

- Update `About` component content.
- Install `toastr` and typings.
- Create dummy `Employee Page`.
- Add new route to `Employee Page`.
- Add link for navigation.
- Create common `form components`.
- Create `EmployeeForm component`.
- Update `Employee Page`.
- Create `Employee Page container`.
- Add save method in `Employee API`.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already
installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v`
in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content of the `06 AJAX Call` folder to an empty folder for the sample.

- Install the npm packages described in the `package.json` and verify that it works:

 ```bash
 $ npm install
 ```

- We update `About` content to show sample `07 Form` highlights. You can see updates in `./src/components/about.tsx`.

- Install `toastr` and typings to show toast when save form changes:

```bash
npm install toastr --save
npm install @types/toastr --save-dev
```


...

```


```

### ./src/common/components/form/button.tsx

```javascript
import * as React from 'react';

interface Props {
  label: string;
  className: string;
  onClick: () => void;
}

export const Button: React.StatelessComponent<Props> = (props) => {

  return (
    <button type="button"
      className={props.className}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

```

- Create its `index.ts` file:

### ./src/common/components/form/index.ts
```javascript
export * from './input';
export * from './button';

```

- Create `EmployeeForm component`:

### ./src/components/Employee/EmployeeForm.tsx
```javascript
import * as React from 'react';
import { EmployeeEntity } from '../../model';
import { Input, Button } from '../../common/components/form';

interface Props {
  Employee: EmployeeEntity;
  onChange: (fieldName: string, value: string) => void;
  onSave: () => void;
}

export const EmployeeForm: React.StatelessComponent<Props> = (props) => {
  return (
    <form>
      <h1>Manage Employee</h1>

      <Input
        name="login"
        label="Login"
        value={props.Employee.login}
        onChange={props.onChange}
      />

      <Input
        name="avatar_url"
        label="Avatar Url"
        value={props.Employee.avatar_url}
        onChange={props.onChange}
      />

      <Button
        label="Save"
        className="btn btn-default"
        onClick={props.onSave}
      />
    </form>
  );
};

```

- Update `Employee Page`:

### ./src/components/Employee/page.tsx
```diff
import * as React from 'react';
+ import { EmployeeEntity } from '../../model';
+ import { EmployeeForm } from './EmployeeForm';

+ interface Props {
+   Employee: EmployeeEntity;
+   onChange: (fieldName: string, value: string) => void;
+   onSave: () => void;
+ }

- export const EmployeePage: React.StatelessComponent<{}> = () => {
+ export const EmployeePage: React.StatelessComponent<Props> = (props) => {
  return (
-   <div className="row">
-     <h2>Employee Page</h2>
-   </div>
+   <EmployeeForm
+     Employee={props.Employee}
+     onChange={props.onChange}
+     onSave={props.onSave}
+   />
  );
}

```

- Create `Employee Page container`:

### ./src/components/Employee/pageContainer.tsx
```javascript
import * as React from 'react';
import { EmployeeEntity } from '../../model';
import { EmployeePage } from './page';

interface State {
  Employee: EmployeeEntity;
}

export class EmployeePageContainer extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      Employee: {
        id: -1,
        login: '',
        avatar_url: '',
      }
    };

    this.onFieldValueChange = this.onFieldValueChange.bind(this);
  }

  private onFieldValueChange(fieldName: string, value: string) {
    const nextState = {
      ...this.state,
      Employee: {
        ...this.state.Employee,
        [fieldName]: value,
      }
    };

    this.setState(nextState);
  }

  private onSave() {
    console.log('save');
  }

  render() {
    return (
      <EmployeePage
        Employee={this.state.Employee}
        onChange={this.onFieldValueChange}
        onSave={this.onSave}
      />
    );
  }
}

```
- Update its `index.ts` file:

### ./src/components/Employee/index.ts
```diff
- export * from './page';
+ export * from './pageContainer';

```

- And router:

### ./src/router.tsx
```diff
import * as React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { App } from './app';
- import { About, EmployeesPage, EmployeePage } from './components';
+ import { About, EmployeesPage, EmployeePageContainer } from './components';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <HashRouter>
      <div className="container-fluid">
        <Route component={App} />
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/about" component={About} />
          <Route path="/Employees" component={EmployeesPage} />
-         <Route path="/Employee" component={EmployeePage} />
+         <Route path="/Employee" component={EmployeePageContainer} />
        </Switch>
      </div>
    </HashRouter>
  );
}

```

- Add save method in `Employee API`:

### ./src/api/Employee/index.ts
```diff
import { EmployeeEntity } from '../../model';
import { Employees } from './mockData';

const baseURL = 'https://api.github.com/orgs/lemoncode';
+ let mockEmployees = Employees;

const fetchEmployees = (): Promise<EmployeeEntity[]> => {
- return Promise.resolve(Employees);
+ return Promise.resolve(mockEmployees);
};

...

+ const saveEmployee = (Employee: EmployeeEntity): Promise<boolean> => {
+   const index = mockEmployees.findIndex(m => m.id === Employee.id);

+   index >= 0 ?
+     updateEmployee(Employee, index) :
+     insertEmployee(Employee);

+   return Promise.resolve(true);
+ };

+ const updateEmployee = (Employee: EmployeeEntity, index: number) => {
+   mockEmployees = [
+     ...mockEmployees.slice(0, index),
+     Employee,
+     ...mockEmployees.slice(index + 1),
+   ];
+ };

+ const insertEmployee = (Employee: EmployeeEntity) => {
+   Employee.id = mockEmployees.length;

+   mockEmployees = [
+     ...mockEmployees,
+     Employee,
+   ];
+ };

export const EmployeeAPI = {
  fetchEmployees,
  fetchEmployeesAsync,
+ saveEmployee,
};

```

- Use again `fetchEmployees`:

### ./src/components/Employees/page.tsx
```diff
...

  public componentDidMount() {
-   EmployeeAPI.fetchEmployeesAsync()
+   EmployeeAPI.fetchEmployees()
      .then((Employees) => {
        this.setState({ Employees });
      });
  }

  ...
};

```

- Update `Employee page` container:

### ./src/components/Employee/pageContainer.tsx
```diff
import * as React from 'react';
+ import * as toastr from 'toastr';
+ import { EmployeeAPI } from '../../api/Employee';
+ import { History } from 'history';
import { EmployeeEntity } from '../../model';
import { EmployeePage } from './page';

...

+ interface Props {
+   history: History;
+ }


- export class EmployeePageContainer extends React.Component<{}, State> {
+ export class EmployeePageContainer extends React.Component<Props, State> {


+  private onSave = () => {
-   console.log('save');
+   EmployeeAPI.saveEmployee(this.state.Employee)
+     .then(() => {
+       toastr.success('Employee saved.');
+       this.props.history.goBack();
+     });
  }

  ...

  render() {
    return (
      <EmployeePage
        Employee={this.state.Employee}
        onChange={this.onFieldValueChange}
        onSave={this.onSave}
      />
    );
  }
}

```

- Execute the example:

 ```bash
 $ npm start
 ```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us. 
