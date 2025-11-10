import { Card, CardContent, Typography, Box } from "@mui/material";

const ServiceCard = ({ item }) => {
  const iconIsEmoji =
    item?.icon && item.icon.length <= 4 && !item.icon.includes("/");
  return (
    <Card
      sx={{
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "rgba(255, 255, 255, 0.28)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255, 255, 255, 0.35)",
        boxShadow: "0 14px 30px rgba(12, 74, 110, 0.08)",
        transition: "all .25s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 20px 36px rgba(12, 74, 110, 0.12)",
        },
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 3,
            background:
              "linear-gradient(135deg, rgba(13,148,136,0.12), rgba(59,130,246,0.05))",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
            fontSize: 28,
            overflow: "hidden",
          }}
        >
          {iconIsEmoji ? (
            item.icon
          ) : item?.icon ? (
            <img
              src={item.icon}
              alt=""
              style={{ width: 28, height: 28, objectFit: "contain" }}
              loading="lazy"
            />
          ) : (
            "🩺"
          )}
        </Box>

        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
          {item.title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.78 }}>
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
