import React, { useState } from 'react';
import {
  Grid,
  Form,
  Button,
  Modal,
  Table,
  TextArea,
  Input,
} from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TODO } from './apollo/mutations/todo';
import { GET_TODO } from './apollo/queries';

function CreateTodo() {
  const [open, setOpen] = React.useState(false);
  const [createTodo, { loading }] = useMutation(CREATE_TODO);
  const { data, refetch } = useQuery(GET_TODO);
  const [todo, setTodo] = useState({ title: '', body: '' });

  const handleChange = ({ target: { name, value } }) => {
    console.log(name);
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await createTodo({
      variables: {
        input: todo,
      },
      update: (hee) => {
        console.log(hee);
      }
    });
    refetch();
    setOpen(false);
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh', paddingTop: '48px' }}>
      <Grid.Column style={{ maxWidth: 600 }}>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data?.listAllEntries?.map(({ id, title, body }) => (
              <Table.Row key={id}>
                <Table.Cell singleLine>{title}</Table.Cell>
                <Table.Cell textAlign="right">{body}</Table.Cell>
                <Table.Cell>
                  <Button>Delete</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button>Clear</Button>
        <Button primary onClick={() => setOpen(true)}>
          Add Todo
        </Button>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
        >
          <Modal.Header>Add Todo</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit}>
              <Form.Field
                control={Input}
                onChange={handleChange}
                name="title"
                label="Title"
                placeholder="Title"
              />
              <Form.Field
                control={TextArea}
                name="body"
                onChange={handleChange}
                label="Description"
                placeholder="Description"
              />
              <Form.Group>
                <Form.Field
                  control={Button}
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  Cancel
                </Form.Field>
                <Form.Field control={Button} type="submit" primary>
                  {loading ? 'Saving...' : 'Save'}
                </Form.Field>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  );
}
export default CreateTodo;
