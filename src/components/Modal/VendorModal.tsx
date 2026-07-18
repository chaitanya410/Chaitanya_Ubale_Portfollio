import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  alpha,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TagIcon from '@mui/icons-material/Tag';

interface Vendor {
  LedgerId: string;
  LedgerName?: string;
  LedgerOutStandingAmount: number;
  LedgerPrqAmt: number;
  Priority?: number;
}

interface VendorData {
  BUID: string;
  BUName: string;
  DueAmount: number;
}

interface VendorModalProps {
  open: boolean;
  onClose: () => void;
  vendor: VendorData | null;
  data: Vendor[];
}

const formatCurrency = (amount: number) =>
  `₹${Math.round(amount).toLocaleString('en-IN')}`;

const VendorModal: React.FC<VendorModalProps> = ({ open, onClose, vendor, data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!vendor) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 4,
          overflow: 'hidden',
          background: '#ffffff',
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          color: 'white',
          py: 3,
          px: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -30,
            right: -30,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BusinessCenterIcon sx={{ fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {vendor.BUName}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Vendor Details & Priorities
              </Typography>
            </Box>
          </Stack>
          <IconButton 
            onClick={onClose} 
            sx={{ 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Summary Cards */}
        <Box sx={{ p: 3, background: '#f8fafc' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
            <Card 
              sx={{ 
                flex: 1, 
                borderRadius: 3,
                border: '1px solid',
                borderColor: alpha('#0f172a', 0.06),
                boxShadow: 'none',
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2.5,
                      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AccountBalanceWalletIcon sx={{ color: '#1d4ed8', fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      Total Due Amount
                    </Typography>
                    <Typography variant="h6" fontWeight={800} color="text.primary">
                      {formatCurrency(vendor.DueAmount)}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
            <Card 
              sx={{ 
                flex: 1, 
                borderRadius: 3,
                border: '1px solid',
                borderColor: alpha('#0f172a', 0.06),
                boxShadow: 'none',
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2.5,
                      background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TagIcon sx={{ color: '#7c3aed', fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      Business Unit ID
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="text.primary">
                      {vendor.BUID}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>

        <Divider />

        {/* Priority List */}
        <Box sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>
            Priority Breakdown
            <Typography component="span" variant="body2" color="text.secondary" ml={1}>
              ({data.length} vendors)
            </Typography>
          </Typography>

          {isMobile ? (
            // Mobile Card View
            <Stack gap={2}>
              {data.map((v, index) => (
                <Card 
                  key={v.LedgerId} 
                  sx={{ 
                    borderRadius: 3, 
                    border: '1px solid',
                    borderColor: alpha('#0f172a', 0.06),
                    boxShadow: 'none',
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {v.LedgerName || `Vendor ${index + 1}`}
                      </Typography>
                      <Chip
                        label={`P${v.Priority || index + 1}`}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.7rem',
                          height: 22,
                          background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                          color: 'white',
                        }}
                      />
                    </Stack>
                    <Stack gap={1}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Outstanding:
                        </Typography>
                        <Typography variant="body2" fontWeight={700} color="#dc2626">
                          {formatCurrency(v.LedgerOutStandingAmount)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          PRQ Amount:
                        </Typography>
                        <Typography variant="body2" fontWeight={700} color="#059669">
                          {formatCurrency(v.LedgerPrqAmt)}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            // Desktop Table View
            <TableContainer 
              component={Paper} 
              sx={{ 
                borderRadius: 3, 
                border: '1px solid',
                borderColor: alpha('#0f172a', 0.06),
                boxShadow: 'none',
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Ledger Name</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Outstanding</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>PRQ Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((v, index) => (
                    <TableRow key={v.LedgerId}>
                      <TableCell>
                        <Chip
                          label={`P${v.Priority || index + 1}`}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            height: 22,
                            background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                            color: 'white',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {v.LedgerName || `Vendor ${index + 1}`}
                      </TableCell>
                      <TableCell align="right" sx={{ color: '#dc2626', fontWeight: 700 }}>
                        {formatCurrency(v.LedgerOutStandingAmount)}
                      </TableCell>
                      <TableCell align="right" sx={{ color: '#059669', fontWeight: 700 }}>
                        {formatCurrency(v.LedgerPrqAmt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {data.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography color="text.secondary" fontWeight={500}>
                No priority data available
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VendorModal;
