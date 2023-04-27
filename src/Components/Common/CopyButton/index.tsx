import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconButton from '@mui/material/IconButton';
import { Done } from '@styled-icons/material-rounded';
import { ContentCopy } from '@styled-icons/material';
import Tooltip from '@mui/material/Tooltip';

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <>
      <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
        {copied ? (
          <Tooltip title="Copied!" placement="top">
            <IconButton>
              <Done size={20} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Copy" placement="top">
            <IconButton>
              <ContentCopy size={20} />
            </IconButton>
          </Tooltip>
        )}
      </CopyToClipboard>
    </>
  );
};
