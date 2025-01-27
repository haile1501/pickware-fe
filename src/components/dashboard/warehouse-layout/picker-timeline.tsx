import { Stack } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { getTodayWorkLogs } from 'src/redux/slices/work-log';
import { useDispatch, useSelector } from 'src/redux/store';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { WorkLogAction } from 'src/types/redux/work-log';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';

interface PickerTimeLineProps {
  pickerId: string;
}

const actionIconMapping: Record<WorkLogAction, ReactNode> = {
  [WorkLogAction.CHECK_IN]: <LoginOutlinedIcon />,
  [WorkLogAction.CHECK_OUT]: <LogoutOutlinedIcon />,
  [WorkLogAction.BATCH_ASSIGNED]: <AssignmentOutlinedIcon />,
  [WorkLogAction.START_PICKING]: <PlayCircleOutlineOutlinedIcon />,
  [WorkLogAction.FINISH_PICKING]: <AssignmentTurnedInOutlinedIcon />,
};

const actionNameMapping: Record<WorkLogAction, string> = {
  [WorkLogAction.CHECK_IN]: 'Check-in',
  [WorkLogAction.CHECK_OUT]: 'Check-out',
  [WorkLogAction.BATCH_ASSIGNED]: 'Batch assigned',
  [WorkLogAction.START_PICKING]: 'Start picking',
  [WorkLogAction.FINISH_PICKING]: 'Finish picking',
};

export const PickerTimeLine = (props: PickerTimeLineProps) => {
  const { pickerId } = props;
  const dispatch = useDispatch();
  const { workLogs } = useSelector((state) => state.workLog);

  useEffect(() => {
    dispatch(getTodayWorkLogs(pickerId));
  }, [dispatch]);

  const timelineData = workLogs.map((log) => ({
    time: new Date(log.createdAt).toLocaleTimeString(),
    title: log.action,
    icon: actionIconMapping[log.action],
  }));

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <TimelineOutlinedIcon />
        <Typography variant="h6">Today timeline</Typography>
      </Stack>

      <Timeline position="alternate">
        {timelineData.map((entry, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
              align="left"
              variant="body2"
              color="text.secondary"
            >
              {entry.time}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot
                color="primary"
                variant="filled"
              >
                {entry.icon}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="subtitle1"
                component="span"
              >
                {actionNameMapping[entry.title]}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Stack>
  );
};
