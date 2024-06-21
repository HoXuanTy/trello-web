import BoardProps from "@/types/BoardProp";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

import EnterpriseIcon from "@/assets/icons/enterprise.svg?react";

export const mockData: BoardProps = {
    board: {
      _id: 'board-id-01',
      title: 'Project Management 1',
      description: 'description of test',
      types: [
        {
          _id: "type-id-01",
          title: "private",
          icon: LockOutlinedIcon,
          description: " Board members and không gian làm việc của Tý Hồ xuân Workspace admins can see and edit this board."
        },
        {
          _id: "type-id-02",
          title: "workspace",
          icon: PeopleAltOutlinedIcon,
          description: "All members of the không gian làm việc của Tý Hồ xuân Workspace can see and edit this board."
        },
        {
          _id: "type-id-03",
          title: "organization",
          icon: EnterpriseIcon,
          description: "All members of the organization can see this board. The board must be added to an enterprise Workspace to enable this.",
          disabled: true,
        },
        {
          _id: "type-id-04",
          title: "public",
          icon: PublicOutlinedIcon,
          description: "Anyone on the internet can see this board. Only board members can edit"
        }
      ],
      ownerIds: [],
      memberIds: [], 
      columnOrderIds: ['column-id-02', 'column-id-01', 'column-id-03'],
      columns: [
        {
          _id: 'column-id-01',
          boardId: 'board-id-01',
          title: 'To Do Column 01',
          cardOrderIds: ['card-id-01', 'card-id-02', 'card-id-03', 'card-id-04', 'card-id-05', 'card-id-06', 'card-id-07'],
          cards: [
            {
              _id: 'card-id-01',
              boardId: 'board-id-01',
              columnId: 'column-id-01',
              title: 'Title of card 01',
              description: 'description of card 1',
              cover: 'https://file.hstatic.net/200000722513/article/dead-cells-ign-fantasy-july_be77defd3d614601a81dca3962701299.jpg',
              memberIds: ['test-user-id-01'],
              comments: ['test comment 01', 'test comment 02'],
              attachments: ['test attachment 02', 'test attachment 01', 'test attachment 03']
            },
            { _id: 'card-id-02', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 02', description: "", cover: "", memberIds: [], comments: [], attachments: [] },
            { _id: 'card-id-03', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 03', description: "", cover: "", memberIds: [], comments: [], attachments: [] },
            { _id: 'card-id-04', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 04', description: "", cover: "", memberIds: [], comments: [], attachments: [] },
            { _id: 'card-id-05', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 05', description: "", cover: "", memberIds: [], comments: [], attachments: [] },
            { _id: 'card-id-06', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 06', description: "", cover: "", memberIds: [], comments: [], attachments: [] },
            { _id: 'card-id-07', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 07', description: "", cover: "", memberIds: [], comments: [], attachments: [] }
          ]
        },
        {
          _id: 'column-id-02',
          boardId: 'board-id-01',
          title: 'Inprogress Column 02',
          cardOrderIds: ['card-id-08', 'card-id-09', 'card-id-10'],
          cards: [
            { _id: 'card-id-08', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 08', description: "", cover: "", memberIds: [], comments: [], attachments: [] },
            { _id: 'card-id-09', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 09', description: "", cover: "", memberIds: [], comments: [], attachments: [] },
            { _id: 'card-id-10', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 10', description: "", cover: "", memberIds: [], comments: [], attachments: [] }
          ]
        },
        {
          _id: 'column-id-03',
          boardId: 'board-id-01',
          title: 'Done Column 03',
          cardOrderIds: ['card-id-11', 'card-id-12', 'card-id-13'],
          cards: [
            { _id: 'card-id-11', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 11', description: "", cover: "", memberIds: [], comments: [], attachments: [] },
            { _id: 'card-id-12', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 12', description: "", cover: "", memberIds: [], comments: [], attachments: [] },
            { _id: 'card-id-13', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 13', description: "", cover: "", memberIds: [], comments: [], attachments: [] }
          ]
        }
      ]
    }
  }