import {
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Container,
  Divider,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import React from "react";
import MessageSubmit from "./MessageSubmit";

function MessageBoard({ uid }) {
  return (
    <div>
      <List>
        <ListItem button divider>
          <Container>
            <Card elevation={0}>
              <CardHeader
                avatar={<Avatar>M</Avatar>}
                action={
                  <IconButton>
                    <DeleteOutlined />
                  </IconButton>
                }
                title="sfsdf"
                subheader="sfjslfjsdof"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  "Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.\nLorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book."
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </ListItem>
        <ListItem divider>
          <MessageSubmit />
        </ListItem>
      </List>
    </div>
  );
}

export default MessageBoard;
